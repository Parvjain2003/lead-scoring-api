# Lead Scoring API

This project is a backend service that scores sales leads based on **product/offer context** and **prospect data**. It combines **rule-based logic** with **AI reasoning** to classify each lead's intent as **High**, **Medium**, or **Low**, returning a final score between 0–100.

---

## Objective

This backend was built as part of a **Backend Engineer Hiring Assignment** to demonstrate the ability to:

- Build clean and modular backend APIs  
- Integrate AI models (e.g., OpenAI or Gemini)  
- Combine rule-based logic with AI reasoning  
- Deliver a working and testable backend service[web:6]  

---

## 🧩 Core Functionality

The system accepts product/offer details and a CSV file of leads[web:6][web:7].  
Each lead is processed through a **two-layer scoring pipeline**:

### 1. Rule Layer (Max 50 points)

This layer assigns a score based on static business logic:

| Rule | Condition | Points |
|------|------------|--------|
| Role relevance | Decision Maker (+20), Influencer (+10), else 0 | Up to 20 |
| Industry match | Exact ICP (+20), Adjacent (+10), else 0 | Up to 20 |
| Data completeness | All fields filled | +10 |

**→ Max Rule Score = 50**

---

### 2. AI Layer (Max 50 points)

The AI model analyzes both **offer** and **lead** context and classifies intent.

**→ Final Score = Rule Score + AI Points**

---

## 🔁 API Flow

### 1️⃣ `POST /offer`

Upload offer details[web:6].

**Request Body:**

{
"name": "AI Outreach Automation",
"value_props": ["24/7 outreach", "6x more meetings"],
"ideal_use_cases": ["B2B SaaS mid-market"]
}

---

### 2️⃣ `POST /leads/upload`

Upload a CSV file of leads.

**CSV Format:**

---

### 3️⃣ `POST /score`

Triggers the scoring pipeline to process all uploaded leads.

---

### 4️⃣ `GET /results`

Fetches the final scored results[web:6].

---

## 🧮 How It Works (Flow)

**Offer Input:**  
You first upload offer details through `/offer`.  
These details define the target ICP (Ideal Customer Profile).

**Leads Upload:**  
Next, you upload a CSV file containing multiple lead entries.  
The file is parsed and stored temporarily in `/uploads`.

**Scoring Pipeline:**  
When `/score` is triggered:

- Each lead passes through the Rule Layer for static scoring.
- The lead + offer data is then sent to AI Layer for reasoning.
- The final score is computed and stored.

**Results Fetch:**  
You can view or export the results using `/results`.

---

## 🧰 Tech Stack

- **Node.js + Express.js** – Backend framework
- **Multer** – File upload handling
- **CSV-Parser** – For reading lead data
- **dotenv** – For environment variables
- **Gemini API** – For AI reasoning

---

## 🧠 AI Integration

The AI Layer uses the offer + lead context to ask:  
**"Classify intent (High / Medium / Low) and explain in 1–2 sentences."**.

The response is parsed to extract:

- **intent** → converted to numerical AI score
- **reasoning** → stored for output

## 🎥 Demo Video

> **📹 [Click here to watch the complete API demo walkthrough](https://www.loom.com/share/9f0610c2562f4c56bc7f2e7e1426d6d0)**

