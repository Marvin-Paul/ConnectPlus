import { NextResponse } from "next/server";

const quizzes = {
  "react-dev": {
    id: "react-dev",
    title: "Next.js & React Mastery",
    levels: [
      {
        id: "lvl1",
        title: "Foundation Level",
        questions: [
          {
            id: "q1",
            question: "What is the primary benefit of Server Components in Next.js 13+?",
            options: [
              "Zero client-side bundle size for the component",
              "Automatic client-side hydration for all logic",
              "Improved SEO only for non-dynamic pages",
              "Support for browser-only APIs by default"
            ],
            correctAnswer: 0,
            explanation: "Server Components allow you to render components on the server and send them as static HTML/JSON, resulting in zero client-side JavaScript for those components."
          }
        ]
      },
      {
        id: "lvl2",
        title: "Professional Level",
        questions: [
          {
            id: "q2",
            question: "Which hook should be used to handle side effects in a functional component?",
            options: [
              "useState",
              "useMemo",
              "useEffect",
              "useCallback"
            ],
            correctAnswer: 2,
            explanation: "useEffect is the standard hook for managing side effects like API calls, timers, or manual DOM manipulations."
          }
        ]
      },
      {
        id: "lvl3",
        title: "Expert Architect",
        questions: [
          {
            id: "q3",
            question: "What does the 'L' in the SOLID principles stand for?",
            options: [
              "Logic Segregation",
              "Liskov Substitution",
              "Layers of Inheritance",
              "Loose Coupling"
            ],
            correctAnswer: 1,
            explanation: "The Liskov Substitution Principle states that objects of a superclass should be replaceable with objects of its subclasses without breaking the application."
          }
        ]
      }
    ]
  },
  "python-ds": {
    id: "python-ds",
    title: "Fintech Data Analysis",
    levels: [
      {
        id: "lvl1",
        title: "Data Manipulation",
        questions: [
          {
            id: "q1",
            question: "In Pandas, which method is used to handle missing values by filling them with a specific value?",
            options: [
              "dropna()",
              "fillna()",
              "replace_null()",
              "clean_data()"
            ],
            correctAnswer: 1,
            explanation: "fillna() is used to fill NA/NaN values using the specified method or value."
          },
          {
            id: "q2",
            question: "Which library is most commonly used for visualizing data with professional-grade plots in Python?",
            options: [
              "NumPy",
              "PyClips",
              "Matplotlib",
              "VisualPy"
            ],
            correctAnswer: 2,
            explanation: "Matplotlib is the foundational library for data visualization in the Python ecosystem."
          }
        ]
      }
    ]
  }
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const quiz = quizzes[id as keyof typeof quizzes];

  if (!quiz) {
    return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
  }

  return NextResponse.json(quiz);
}
