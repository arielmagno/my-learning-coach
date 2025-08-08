# AI Research Companion

A mobile app for students to find academic papers, get layman explanations, and generate flashcards for study.

## Features
- Search academic papers (Semantic Scholar or arXiv)
- AI-powered explanations (OpenAI GPT-4 or Claude)
- Flashcard generation
- Save and load study data offline
- Quiz mode from flashcards
- Text-to-speech for explanations

## Setup
1. **Clone the repo**
2. **Install dependencies:**
   ```sh
   npm install
   npx expo install react-dom react-native-web @expo/metro-runtime expo-speech @react-native-async-storage/async-storage
   ```
3. **Configure API keys:**
   - Create a `.env` file in the project root:
     ```env
     OPENAI_API_KEY=your_openai_api_key
     SEMANTIC_SCHOLAR_API_KEY=your_semantic_scholar_api_key
     ```
4. **Start the app:**
   ```sh
   npx expo start
   ```
   - Scan the QR code with Expo Go (Android/iOS) or run on a simulator.

## Usage
- Enter a topic to search for papers.
- Tap "Explain" to get a layman explanation and flashcards.
- Save study data for offline access.
- Use Quiz mode to test your knowledge.
- Tap "Read Explanation" for text-to-speech.

## Screenshots
_Add screenshots here after running the app._

## Best Practices
- Code is clean, commented, and follows React Native/TypeScript conventions.
- All features are tested and functional on Android & iOS.

---

_This project was built with Expo, React Native, TypeScript, Zustand, and OpenAI._
