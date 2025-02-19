const OpenAI = require('openai'); // Ensure you have the OpenAI client or API set up correctly
const model = require('../Models/chatSummary');


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

function extractStudySchedule(text) {
  const studyPlan = {};
  let currentWeek = "This Week"; // Default if no weeks are mentioned
  let currentDay = null;

  const lines = text.split("\n").map(line => line.trim());

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect Weeks (Handles "Week X: Title" format)
    const weekMatch = line.match(/^#### (Week \d+: .+)$/);
    if (weekMatch) {
      currentWeek = weekMatch[1];
      studyPlan[currentWeek] = {}; // Initialize new week object
      continue;
    }

    // Detect Days (e.g., "- **Monday**")
    const dayMatch = line.match(/^- \*\*(\w+)\*\*$/);
    if (dayMatch) {
      currentDay = dayMatch[1];
      if (!studyPlan[currentWeek]) studyPlan[currentWeek] = {}; // Ensure week exists
      studyPlan[currentWeek][currentDay] = [];
      continue;
    }

    // Extract Time and Subject
    const timeMatch = line.match(/- \*\*Time:\*\* ([\d:AMP -]+)$/);
    if (timeMatch && currentDay) {
      const time = timeMatch[1];
      const nextLine = lines[i + 1]?.trim();

      // Extract Subject
      let subject = "No subject provided";
      if (nextLine?.startsWith("- **Focus:**")) {
        subject = nextLine.replace("- **Focus:**", "").trim();
        i++; // Skip next line since it's processed
      }

      // Store in correct week & day
      studyPlan[currentWeek][currentDay].push({ time, subject });
    }
  }

  return studyPlan;
}




const handleStream = async (req, res) => {
  let chatHistory = []; 
  const userId = req.query.userId;
  const assistant_exist = await model.findOne({ userId: userId });
  let thread_id = assistant_exist.thread_id;
  let assistant_id = assistant_exist.assistant_id;
  let fullResponse = '';

  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const run = openai.beta.threads.runs.stream(thread_id, { assistant_id: assistant_id })
    .on('textCreated', () => process.stdout.write('\nassistant > '))
    .on('textDelta', (textDelta) => {
      process.stdout.write(textDelta.value);
      fullResponse += textDelta.value;
      res.write(`data: ${JSON.stringify({ message: textDelta.value })}\n\n`);
    })
    .on('end', () => {
      console.log("\n--- Response Ended ---");
      chatHistory.push({ role: "assistant", message: fullResponse.trim() });
      console.log("TEST____")
        const jsonMatch = fullResponse.match(/```json\n([\s\S]+?)\n```/);

if (jsonMatch) {
  const jsonString = jsonMatch[1]; // Extract just the JSON part
  const studyPlan = JSON.parse(jsonString); // Convert to an object
  const plan = JSON.stringify(studyPlan, null, 2)
  console.log(JSON.stringify(studyPlan, null, 2));
  res.write(`data: ${JSON.stringify({ structuredPlan: plan })}\n\n`);

} 


      const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
      const containsDayOfWeek = daysOfWeek.some(day => fullResponse.toLowerCase().includes(day));

      if (fullResponse.toLowerCase().includes("study schedule") || containsDayOfWeek) {
        const structuredSchedule = extractStudySchedule(fullResponse);
        //console.log("\nGenerated Study Schedule JSON:", structuredSchedule);
console.log("TEST____")
        const jsonMatch = fullResponse.match(/```json\n([\s\S]+?)\n```/);

if (jsonMatch) {
  const jsonString = jsonMatch[1]; // Extract just the JSON part
  const studyPlan = JSON.parse(jsonString); // Convert to an object
  res.write(`data: ${JSON.stringify({ structuredPlan: studyPlan })}\n\n`);

  console.log(studyPlan);
}

        // ✅ Send structured study plan via SSE
        //res.write(`data: ${JSON.stringify({ structuredPlan: structuredSchedule })}\n\n`);
      }

      
      res.end();
    });

  run.on('error', (err) => {
    console.error('Error during SSE stream:', err);
    res.write(`data: ${JSON.stringify({ error: 'Internal Server Error' })}\n\n`);
    res.end();
  });
};




module.exports = { handleStream };
