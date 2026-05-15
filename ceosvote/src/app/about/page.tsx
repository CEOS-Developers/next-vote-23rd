import AppHeader from "@/components/AppHeader";

const teamMembers = [
  {
    role: "FE",
    names: "구민교, 이윤서",
  },
  {
    role: "BE",
    names: "최우혁, 황신애",
  },
];

export default function AboutPage() {
  return (
    <div className="app-page">
      <div className="app-container app-page-stack">
        <AppHeader />

        <main className="about-panel" aria-labelledby="about-title">
          <h2 id="about-title" className="neurimbo-head about-title">
            CEOS
          </h2>

          <dl className="about-team-list">
            {teamMembers.map((member) => (
              <div key={member.role} className="about-team-row">
                <dt className="text-t20-semibold mobile-text-b16-semibold about-team-label">
                  {member.role}:
                </dt>
                <dd className="text-t20-reg mobile-text-b16-med">
                  {member.names}
                </dd>
              </div>
            ))}
          </dl>
        </main>
      </div>
    </div>
  );
}
