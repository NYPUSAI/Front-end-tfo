export function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export const teamMap = {
  "Onboarding Team": 1,
  "Recruitment Team": 2,
  "SEO Team": 3,
  "Marketing Research Team": 4,
  "Social Media Team": 7,
  "Content Creation": 6,
  "Customer Relationship Management": 8,
  "Sales Strategy": 9,
  "Lead Generation": 5,
};

export const FormButtonText = {
  "Onboarding Team": "Start Onboarding",
  "Recruitment Team": "New Recruitment",
  "SEO Team": "New SEO Task",
  "Marketing Research Team": "New Research",
  "Social Media Team": "New Post",
  "Content Creation": "New Content",
  "Customer Relationship Management": "New CRM Task",
  "Sales Strategy": "New Strategy",
  "Lead Generation": "New Lead",
};

export function formatJobPosting(text) {
  if (typeof text !== "string") {
    console.error("formatJobPosting received a non-string value:", text);
    return ""; // Return an empty string if it's not a valid text
  }

  const lines = text.split("\n");
  let formattedText = "";
  let inList = false;

  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const boldRegex = /\*\*(.*?)\*\*/g; // Regex to match bold text

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    // Convert URLs into links
    line = line.replace(urlRegex, (url) => `<a href="${url}" class="text-blue-500 underline" target="_blank">${url}</a>`);

    // Convert bold text
    line = line.replace(boldRegex, (match, content) => `<strong>${content}</strong>`);

    if (line.startsWith("**") && line.endsWith("**") && !line.includes(":")) {
      const heading = line.replace(/\*\*/g, "");
      formattedText += `<h2 class="text-lg font-semibold mt-4">${heading}</h2>`;
    } else if (line.startsWith("*") && line.endsWith("*")) {
      const subheading = line.replace(/\*/g, "");
      formattedText += `<h3 class="text-md font-medium mt-3">${subheading}</h3>`;
    } else if (line.startsWith("-")) {
      line = line.substring(1).trim();

      if (line.includes(":")) {
        const [key, value] = line.split(":").map((s) => s.trim());
        formattedText += `<p><strong>${key}:</strong> ${value}</p>`;
      } else {
        if (!inList) {
          formattedText += "<ul class='list-disc ml-5'>";
          inList = true;
        }
        formattedText += `<li>${line}</li>`;
      }
    } else {
      if (inList) {
        formattedText += "</ul>";
        inList = false;
      }
      formattedText += `<p>${line}</p>`;
    }
  }

  if (inList) {
    formattedText += "</ul>";
  }

  return formattedText;
}



