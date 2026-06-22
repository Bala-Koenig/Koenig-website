"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface NodePosition {
  x: number;
  y: number;
  angle: number;
  zIndex: number;
  opacity: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  centerIcon?: React.ReactNode;
}

export default function RadialOrbitalTimeline({
  timelineData,
  centerIcon,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [nodePositions, setNodePositions] = useState<Record<number, NodePosition>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const RADIUS = 210;

  const calculateNodePosition = useCallback(
    (index: number, total: number, rotation: number): NodePosition => {
      const angle = ((index / total) * 360 + rotation) % 360;
      const radian = (angle * Math.PI) / 180;
      const x = RADIUS * Math.cos(radian);
      const y = RADIUS * Math.sin(radian);
      const zIndex = Math.round(100 + 50 * Math.cos(radian));
      const opacity = Math.max(0.35, Math.min(1, 0.35 + 0.65 * ((1 + Math.sin(radian)) / 2)));
      return { x, y, angle, zIndex, opacity };
    },
    []
  );

  // Keep node positions in state so SVG arrows can read them
  useEffect(() => {
    const positions: Record<number, NodePosition> = {};
    timelineData.forEach((item, index) => {
      positions[item.id] = calculateNodePosition(index, timelineData.length, rotationAngle);
    });
    setNodePositions(positions);
  }, [rotationAngle, timelineData, calculateNodePosition]);

  useEffect(() => {
    if (!autoRotate) return;
    const t = setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.25) % 360).toFixed(3)));
    }, 50);
    return () => clearInterval(t);
  }, [autoRotate]);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const closed = Object.keys(prev).reduce<Record<number, boolean>>((acc, k) => {
        acc[parseInt(k)] = false;
        return acc;
      }, {});
      const opening = !prev[id];
      if (opening) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const related = timelineData.find((i) => i.id === id)?.relatedIds ?? [];
        const pulse: Record<number, boolean> = {};
        related.forEach((r) => (pulse[r] = true));
        setPulseEffect(pulse);
        // Snap orbit so this node sits at top-right (270°)
        const idx = timelineData.findIndex((i) => i.id === id);
        setRotationAngle(270 - (idx / timelineData.length) * 360);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }
      return { ...closed, [id]: opening };
    });
  };

  const isRelatedToActive = (itemId: number) => {
    if (!activeNodeId) return false;
    return (timelineData.find((i) => i.id === activeNodeId)?.relatedIds ?? []).includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]) => {
    switch (status) {
      case "completed":   return "text-white bg-black border-white";
      case "in-progress": return "text-black bg-white border-black";
      default:            return "text-white bg-black/40 border-white/50";
    }
  };

  const getStatusLabel = (status: TimelineItem["status"]) =>
    status === "completed" ? "DONE" : status === "in-progress" ? "IN PROGRESS" : "UPCOMING";

  // Level colours for cert paths
  const getLevelColor = (category: string) => {
    if (category === "Fundamentals") return "#10b981";
    if (category === "Associate")    return "#0694D1";
    if (category === "Expert")       return "#f59e0b";
    return "#a855f7";
  };

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
        >
          {/* ── SVG arrow layer — directional connectors between related nodes ── */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 5 }}
          >
            <defs>
              <marker
                id="arrowhead-blue"
                markerWidth="8" markerHeight="6"
                refX="8" refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="rgba(6,148,209,0.7)" />
              </marker>
              <marker
                id="arrowhead-green"
                markerWidth="8" markerHeight="6"
                refX="8" refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="rgba(16,185,129,0.7)" />
              </marker>
              <marker
                id="arrowhead-amber"
                markerWidth="8" markerHeight="6"
                refX="8" refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="rgba(245,158,11,0.7)" />
              </marker>
            </defs>

            {timelineData.map((item) =>
              item.relatedIds.map((relId) => {
                const from = nodePositions[item.id];
                const to   = nodePositions[relId];
                if (!from || !to) return null;

                // Centre of the SVG canvas is 50% / 50%
                const cx = "50%";
                const cy = "50%";

                // We use a foreignObject trick — draw relative to center via transform
                const isActive =
                  activeNodeId === item.id ||
                  activeNodeId === relId ||
                  activeNodeId === null;

                const cat = item.category;
                const color =
                  cat === "Fundamentals" ? "rgba(16,185,129,0.55)" :
                  cat === "Associate"    ? "rgba(6,148,209,0.55)"  :
                  cat === "Expert"       ? "rgba(245,158,11,0.55)" :
                                           "rgba(168,85,247,0.55)";
                const markerId =
                  cat === "Fundamentals" ? "arrowhead-green" :
                  cat === "Associate"    ? "arrowhead-blue"  :
                  cat === "Expert"       ? "arrowhead-amber" :
                                           "arrowhead-blue";

                // Shorten endpoints so arrow starts/ends at node edge (r≈20px)
                const dx = to.x - from.x;
                const dy = to.y - from.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 1) return null;
                const nx = dx / dist;
                const ny = dy / dist;
                const pad = 22;
                const x1 = from.x + nx * pad;
                const y1 = from.y + ny * pad;
                const x2 = to.x   - nx * (pad + 2);
                const y2 = to.y   - ny * (pad + 2);

                return (
                  <line
                    key={`${item.id}-${relId}`}
                    x1={`calc(50% + ${x1}px)`}
                    y1={`calc(50% + ${y1}px)`}
                    x2={`calc(50% + ${x2}px)`}
                    y2={`calc(50% + ${y2}px)`}
                    stroke={color}
                    strokeWidth={isActive ? 1.5 : 0.8}
                    strokeDasharray={activeNodeId ? "none" : "4 4"}
                    markerEnd={`url(#${markerId})`}
                    style={{
                      opacity: isActive ? 1 : 0.3,
                      transition: "opacity 0.4s, stroke-width 0.4s",
                    }}
                  />
                );
              })
            )}
          </svg>

          {/* ── Central orb ── */}
          <div className="absolute w-20 h-20 rounded-full animate-pulse flex items-center justify-center z-10"
               style={{ background: 'radial-gradient(circle, rgba(6,148,209,0.18) 0%, rgba(6,148,209,0.04) 70%)', border: '1.5px solid rgba(6,148,209,0.25)' }}>
            <div className="absolute w-24 h-24 rounded-full border border-white/10 animate-ping opacity-50" />
            <div
              className="absolute w-32 h-32 rounded-full border border-white/[0.06] animate-ping opacity-40"
              style={{ animationDelay: "0.7s" }}
            />
            {centerIcon
              ? <div className="flex items-center justify-center w-12 h-12">{centerIcon}</div>
              : <div className="w-8 h-8 rounded-full bg-white/70 backdrop-blur-md" />
            }
          </div>

          {/* ── Orbit ring ── */}
          <div className="absolute rounded-full border border-white/10"
               style={{ width: RADIUS * 2, height: RADIUS * 2 }} />

          {/* ── Nodes ── */}
          {timelineData.map((item, index) => {
            const pos = calculateNodePosition(index, timelineData.length, rotationAngle);
            const isExpanded = !!expandedItems[item.id];
            const isRelated  = isRelatedToActive(item.id);
            const isPulsing  = !!pulseEffect[item.id];
            const Icon = item.icon;
            const levelColor = getLevelColor(item.category);

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px)`,
                  zIndex: isExpanded ? 200 : pos.zIndex,
                  opacity: isExpanded ? 1 : pos.opacity,
                }}
                onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }}
              >
                {/* Glow aura */}
                <div
                  className={`absolute rounded-full -inset-1 ${isPulsing ? "animate-pulse" : ""}`}
                  style={{
                    background: `radial-gradient(circle, ${levelColor}33 0%, transparent 70%)`,
                    width:  `${item.energy * 0.4 + 44}px`,
                    height: `${item.energy * 0.4 + 44}px`,
                    left:   `-${(item.energy * 0.4 + 44 - 40) / 2}px`,
                    top:    `-${(item.energy * 0.4 + 44 - 40) / 2}px`,
                  }}
                />

                {/* Node circle */}
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    transition-all duration-300
                    ${isExpanded ? "scale-150" : ""}
                  `}
                  style={{
                    background: isExpanded ? levelColor : isRelated ? `${levelColor}66` : "#0c1a26",
                    border: `2px solid ${isExpanded ? levelColor : isRelated ? levelColor : `${levelColor}66`}`,
                    boxShadow: isExpanded ? `0 0 16px ${levelColor}99` : isRelated ? `0 0 8px ${levelColor}66` : "none",
                    color: isExpanded ? "#fff" : isRelated ? "#fff" : levelColor,
                  }}
                >
                  <Icon size={15} />
                </div>

                {/* Step number badge */}
                <div
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black"
                  style={{ background: levelColor, color: "#fff" }}
                >
                  {index + 1}
                </div>

                {/* Label */}
                <div
                  className={`
                    absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap
                    text-[11px] font-semibold tracking-wide transition-all duration-300
                    ${isExpanded ? "text-white scale-110" : "text-white/65"}
                  `}
                >
                  {item.title}
                </div>

                {/* ── Expanded card ── */}
                {isExpanded && (
                  <Card className="absolute top-16 left-1/2 -translate-x-1/2 w-72 bg-black/95 backdrop-blur-lg border-white/20 shadow-2xl shadow-white/5 overflow-visible">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-white/40" />
                    <CardHeader className="pb-2 pt-4 px-4">
                      <div className="flex justify-between items-center gap-2">
                        <Badge className={`px-2 text-[10px] leading-tight ${getStatusStyles(item.status)}`}>
                          {getStatusLabel(item.status)}
                        </Badge>
                        <span className="text-[10px] font-mono text-white/45 shrink-0">{item.date}</span>
                      </div>
                      <CardTitle className="text-sm mt-2 text-white leading-tight">
                        {item.title}
                      </CardTitle>
                      <p className="text-[11px] text-white/55 leading-relaxed mt-1">{item.content}</p>
                    </CardHeader>
                    <CardContent className="px-4 pb-4 pt-0">
                      {/* Energy / progress bar */}
                      <div className="mt-1 pt-3 border-t border-white/10">
                        <div className="flex justify-between items-center text-[10px] mb-1.5">
                          <span className="flex items-center gap-1 text-white/60">
                            <Zap size={9} /> Demand level
                          </span>
                          <span className="font-mono text-white/80">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${item.energy}%`,
                              background: `linear-gradient(to right, ${levelColor}99, ${levelColor})`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Direction arrows — next steps */}
                      {item.relatedIds.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <div className="flex items-center gap-1 mb-2">
                            <Link size={9} className="text-white/50" />
                            <span className="text-[10px] uppercase tracking-wider text-white/50 font-medium">
                              Next step{item.relatedIds.length > 1 ? "s" : ""}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {item.relatedIds.map((relId) => {
                              const rel = timelineData.find((i) => i.id === relId);
                              if (!rel) return null;
                              return (
                                <Button
                                  key={relId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-6 px-2 text-[10px] rounded border-white/20 bg-transparent hover:bg-white/10 text-white/75 hover:text-white"
                                  onClick={(e) => { e.stopPropagation(); toggleItem(relId); }}
                                >
                                  {rel.title}
                                  <ArrowRight size={8} className="ml-1 text-white/50" />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
