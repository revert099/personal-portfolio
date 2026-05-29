import Reveal from "@/components/Reveal";
import { painPoints } from "@/lib/homepage";

export default function ProblemSection() {
  return (
    <section className="bg-background py-16 text-foreground">
      <div className="container-page">
        <Reveal as="div" mode="view" className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
            Common workflow bottlenecks
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Where automation helps most
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            These are common indicators that processes, systems, or manual
            workflows are slowing the business down.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {painPoints.map((card, index) => (
            <Reveal
              key={card.title}
              as="div"
              mode="view"
              delayMs={index * 110}
              durationMs={800}
            >
              <div className="card group h-full p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-md sm:p-6">
                <h3 className="text-base font-semibold tracking-tight transition-colors duration-300 group-hover:text-accent xl:text-lg">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-foreground/80">
                  {card.body}
                </p>
                {/* Desktop hover effect: scenario fades in on hover */}
                <div className="mt-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <p className="text-sm text-accent">
                    <span className="font-semibold">Picture this: </span>
                    {card.title === "Data copied between systems manually" && "you finish a client call, open three tabs, and type the same name, email, and phone number into all of them. Every time. That's not a you problem — that's a systems problem."}
                    {card.title === "Reports rebuilt every week" && "it's Monday morning and someone on your team spends the first two hours pulling last week's numbers together from four different spreadsheets. The report looks the same every week. So does the wasted time."}
                    {card.title === "Processes that depend on one person" && "that person takes leave, and three things quietly stall because only they know the steps. Nobody notices until something's overdue."}
                    {card.title === "Too much repetitive admin work" && "your best employee spends a chunk of every day on tasks that could be handled automatically — chasing approvals, sending the same email, updating the same field. That's not what you hired them for."}
                    {card.title === "Systems creating more work instead of less" && "you bought software to save time, but now someone has to maintain it, reconcile it with the other system, and fix the gaps it creates. The tool became the task."}
                    {card.title === "Access and file management becoming messy" && "a new team member starts and spends their first afternoon asking who has access to what. Folders are named by whoever made them. Nobody's sure which version is current."}
                    {card.title === "Manual processes causing mistakes" && "the same information gets entered twice — once in the form, once in the system — and somewhere along the way a digit changes. Now the downstream report is wrong and nobody knows why."}
                    {card.title === "Workflows that break as the business grows" && "the process that worked fine with five jobs a week starts falling apart at twenty. Nothing's broken exactly — it's just that everything takes longer and more things slip through."}
                  </p>
                </div>
                {/* For mobile: show examples statically */}
                <div className="mt-2 text-sm text-muted/60 lg:hidden">
                  {/* Examples for each pain point (mobile) */}
                  {card.title === "Data copied between systems manually" ? (
                    "Picture this: A new form submission automatically creates a record in your CRM and notifies the right person — no copy-paste."
                  ) : card.title === "Reports rebuilt every week" ? (
                    "Picture this: A live dashboard pulls from your existing data sources so the report always exists and never needs rebuilding."
                  ) : card.title === "Processes that depend on one person" ? (
                    "Picture this: Step-by-step workflows with automatic handoffs so the process runs even when that person is unavailable."
                  ) : card.title === "Too much repetitive admin work" ? (
                    "Picture this: Routine follow-ups, status updates, and reminders sent automatically based on triggers — not manually."
                  ) : card.title === "Systems creating more work instead of less" ? (
                    "Picture this: Tools connected via integration so a change in one place updates everywhere else automatically."
                  ) : card.title === "Access and file management becoming messy" ? (
                    "Picture this: A structured folder and permissions system set up once, with onboarding automations that apply it to every new team member."
                  ) : card.title === "Manual processes causing mistakes" ? (
                    "Picture this: Single-entry data flows where information entered once populates every downstream system — no re-entry, no mismatches."
                  ) : (
                    "Picture this: Automations built with volume in mind — the same process handles 5 jobs or 500 without extra manual effort."
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
