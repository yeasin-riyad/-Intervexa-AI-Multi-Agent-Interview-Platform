import {
  HiOutlineDocumentText,
  HiOutlineMap,
  HiOutlineStar,
} from "react-icons/hi2";

export const dashboardStats = [
  {
    label: "TOTAL INTERVIEWS",
    value: "21",
    badge: "All Time",
    description: "Interviews Created",
  },
  {
    label: "QUESTIONS SOLVED",
    value: "126",
    badge: "Answered",
    description: "Across All Interviews",
  },
  {
    label: "COMPLETED",
    value: "15",
    badge: "21 Total",
    description: "Interviews Finished",
  },
  {
    label: "AVERAGE SCORE",
    value: "23/100",
    badge: "Completed Only",
    description: "Average Performance",
  },
];

export const dashboardAgents = [
  {
    label: "Resume Builder",
    icon: HiOutlineDocumentText,
  },
  {
    label: "Roadmap Builder",
    icon: HiOutlineMap,
  },
  {
    label: "Resume Scorer",
    icon: HiOutlineStar,
  },
];

export const interviewCategories = [
  {
    title: "Technical Interviews",
    count: 13,
    data: [
      { skill: "Correctness", score: 85 },
      { skill: "Clarity", score: 72 },
      { skill: "Relevance", score: 88 },
      { skill: "Detail", score: 74 },
      { skill: "Efficiency", score: 80 },
      { skill: "Communication", score: 77 },
      { skill: "Problem solving", score: 83 },
      { skill: "Creativity", score: 68 },
    ],
  },
  {
    title: "HR Interviews",
    count: 2,
    data: [
      { skill: "Correctness", score: 78 },
      { skill: "Clarity", score: 85 },
      { skill: "Relevance", score: 75 },
      { skill: "Detail", score: 70 },
      { skill: "Efficiency", score: 72 },
      { skill: "Communication", score: 90 },
      { skill: "Problem solving", score: 73 },
      { skill: "Creativity", score: 82 },
    ],
  },
];

export const demoUser = {
  name: "Ankush Sahu",
  email: "ankush25102002@gmail.com",
  initials: "AS",
  interviewCoins: 3590,
};