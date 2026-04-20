import { PixelAgent, PixelTrophy } from "./PixelArt";

export default function AgentHoldingLogo({
  agentScale = 4,
  logoScale = 3,
}: {
  agentScale?: number;
  logoScale?: number;
}) {
  return (
    <div className="agent-holding-logo" aria-hidden="true">
      <div className="ahl-trophy">
        <div className="ahl-trophy-inner">
          <PixelTrophy scale={logoScale} />
        </div>
      </div>
      <div className="ahl-agent">
        <PixelAgent scale={agentScale} pose="victory" />
      </div>
    </div>
  );
}
