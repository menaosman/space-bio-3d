function WhatIfScenario() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("http://localhost:5000/api/whatif", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(data.answer || "No response available.");
    } catch (err) {
      setAnswer("⚠️ Failed to fetch response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="whatif" className="py-16 bg-slate-900 text-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">What-If Scenario</h2>
        <p className="mb-6 text-slate-300">
          Ask a hypothetical question about space biology, and explore how research might answer it.
        </p>

        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 p-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none"
            placeholder="e.g., What if mice were exposed to higher radiation in orbit?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button
            onClick={askQuestion}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-900 font-semibold"
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </div>

        {answer && (
          <div className="mt-6 p-4 bg-slate-800 rounded-lg border border-slate-700">
            <h3 className="font-semibold mb-2 text-sky-300">Answer</h3>
            <p className="text-slate-200 whitespace-pre-line">{answer}</p>
          </div>
        )}
      </div>
    </section>
  );
}
