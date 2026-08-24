// ============================================================
// PROTOTYPE 1
// First working version. Clicking a teacher shows only where
// they are right now, which is the class name and the room.
// The timetable day is fixed at Day 1 at this stage because
// the cycle calculation had not been worked out yet.
//
// The timetable data is written straight into this file now
// instead of being loaded from a CSV, so the page works when
// it is just opened from the file system with no server running.
// ============================================================

// Start and end times for each period of the school day
const SCHOOL_DAY = [
  { period: 0, start: "08:40", end: "08:50" },
  { period: 1, start: "08:50", end: "09:40" },
  { period: 2, start: "09:40", end: "10:30" },
  { period: 3, start: "10:50", end: "11:40" },
  { period: 4, start: "11:40", end: "12:30" },
  { period: 5, start: "13:50", end: "14:40" },
  { period: 6, start: "14:40", end: "15:30" },
];

// The timetable day is hardcoded for now
const TIMETABLE_DAY = 1;

// ============================================================
// TIMETABLE DATA
// Every lesson, held in the file itself
// ============================================================

const LESSONS = [
  {
    teacher: "Mrs Elisha Hoskin",
    day: 1,
    period: 0,
    className: "Tutor",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 1,
    period: 1,
    className: "Free",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 1,
    period: 2,
    className: "9 Technology Fashion & Textiles",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 1,
    period: 3,
    className: "11 Fashion & Textiles Design",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 1,
    period: 4,
    className: "13 Fashion & Textiles Design",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 1,
    period: 5,
    className: "10 Fashion & Textiles Design",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 1,
    period: 6,
    className: "Free",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 2,
    period: 0,
    className: "Tutor",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 2,
    period: 1,
    className: "12 Fashion & Textiles Design",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 2,
    period: 2,
    className: "12 Fashion & Textiles Design",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 2,
    period: 3,
    className: "9 Technology - Fashion & Textiles Design - Block 2",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 2,
    period: 4,
    className: "11 Fashion & Textiles Design",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 2,
    period: 5,
    className: "13 Fashion & Textiles Design",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 2,
    period: 6,
    className: "Free",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 3,
    period: 0,
    className: "Tutor",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 3,
    period: 1,
    className: "9 Technology - Fashion & Textiles Design - Block 2",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 3,
    period: 2,
    className: "Free",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 3,
    period: 3,
    className: "Free",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 3,
    period: 4,
    className: "9 Technology - Fashion & Textiles Design - Block 2",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 3,
    period: 5,
    className: "11 Fashion & Textiles Design",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 3,
    period: 6,
    className: "13 Fashion & Textiles Design",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 4,
    period: 0,
    className: "Tutor",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 4,
    period: 1,
    className: "Free",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 4,
    period: 2,
    className: "10 Fashion & Textiles Design",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 4,
    period: 3,
    className: "12 Fashion & Textiles Design",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 4,
    period: 4,
    className: "9 Technology - Fashion & Textiles Design - Block 2",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 4,
    period: 5,
    className: "Free",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 4,
    period: 6,
    className: "11 Fashion & Textiles Design",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 5,
    period: 0,
    className: "Tutor",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 5,
    period: 1,
    className: "13 Fashion & Textiles Design",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 5,
    period: 2,
    className: "13 Fashion & Textiles Design",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 5,
    period: 3,
    className: "Free",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 5,
    period: 4,
    className: "12 Fashion & Textiles Design",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 5,
    period: 5,
    className: "Free",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 5,
    period: 6,
    className: "9 Technology - Fashion & Textiles Design - Block 2",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 6,
    period: 0,
    className: "Tutor",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 6,
    period: 1,
    className: "11 Fashion & Textiles Design",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 6,
    period: 2,
    className: "11 Fashion & Textiles Design",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 6,
    period: 3,
    className: "10 Fashion & Textiles Design",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 6,
    period: 4,
    className: "Free",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 6,
    period: 5,
    className: "12 Fashion & Textiles Design",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 6,
    period: 6,
    className: "13 Fashion & Textiles Design",
    room: "JPCOM",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 7,
    period: 0,
    className: "Tutor",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 7,
    period: 1,
    className: "Free",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 7,
    period: 2,
    className: "9 Technology - Fashion & Textiles Design",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 7,
    period: 3,
    className: "13 Fashion & Textiles Design",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 7,
    period: 4,
    className: "10 Fashion & Textiles Design",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 7,
    period: 5,
    className: "9 Technology - Fashion & Textiles Design",
    room: "JP10",
  },
  {
    teacher: "Mrs Elisha Hoskin",
    day: 7,
    period: 6,
    className: "12 Fashion & Textiles Design",
    room: "JP10",
  },
  {
    teacher: "Mr Henry Franck",
    day: 1,
    period: 0,
    className: "Tutor",
    room: "JP24",
  },
  {
    teacher: "Mr Henry Franck",
    day: 1,
    period: 1,
    className: "9 Technology - DVC",
    room: "JP25",
  },
  {
    teacher: "Mr Henry Franck",
    day: 1,
    period: 2,
    className: "9 Technology - Animation & Motion Graphics",
    room: "JP25",
  },
  {
    teacher: "Mr Henry Franck",
    day: 1,
    period: 3,
    className: "7 Technology",
    room: "JP25",
  },
  {
    teacher: "Mr Henry Franck",
    day: 1,
    period: 4,
    className: "Free",
    room: "JP24",
  },
  {
    teacher: "Mr Henry Franck",
    day: 1,
    period: 5,
    className: "Free",
    room: "JP24",
  },
  {
    teacher: "Mr Henry Franck",
    day: 1,
    period: 6,
    className: "Free",
    room: "JP24",
  },
  {
    teacher: "Mr Henry Franck",
    day: 2,
    period: 0,
    className: "Tutor",
    room: "JP24",
  },
  {
    teacher: "Mr Henry Franck",
    day: 2,
    period: 1,
    className: "8 Technolgy",
    room: "JP16",
  },
  {
    teacher: "Mr Henry Franck",
    day: 2,
    period: 2,
    className: "8 Technology",
    room: "JP16",
  },
  {
    teacher: "Mr Henry Franck",
    day: 2,
    period: 3,
    className: "11 Design & Visual Communication",
    room: "JP24",
  },
  {
    teacher: "Mr Henry Franck",
    day: 2,
    period: 4,
    className: "7 Technolgy",
    room: "JP25",
  },
  {
    teacher: "Mr Henry Franck",
    day: 2,
    period: 5,
    className: "Free",
    room: "JP24",
  },
  {
    teacher: "Mr Henry Franck",
    day: 2,
    period: 6,
    className: "10 Digital Technology",
    room: "JP24",
  },
  {
    teacher: "Mr Henry Franck",
    day: 3,
    period: 0,
    className: "Tutor",
    room: "JP24",
  },
  {
    teacher: "Mr Henry Franck",
    day: 3,
    period: 1,
    className: "9 Technology - Animation & Motion Graphics",
    room: "JP25",
  },
  {
    teacher: "Mr Henry Franck",
    day: 3,
    period: 2,
    className: "Free",
    room: "JP24",
  },
  {
    teacher: "Mr Henry Franck",
    day: 3,
    period: 3,
    className: "9 Technology DVC",
    room: "JP25",
  },
  {
    teacher: "Mr Henry Franck",
    day: 3,
    period: 4,
    className: "11 Design & Visual Communication",
    room: "JP24",
  },
  {
    teacher: "Mr Henry Franck",
    day: 3,
    period: 5,
    className: "10 Digital Technology",
    room: "JP11",
  },
  {
    teacher: "Mr Henry Franck",
    day: 3,
    period: 6,
    className: "Free",
    room: "JP24",
  },
  {
    teacher: "Mr Henry Franck",
    day: 4,
    period: 0,
    className: "Tutor",
    room: "JP24",
  },
  {
    teacher: "Mr Henry Franck",
    day: 4,
    period: 1,
    className: "10 Digital Technology",
    room: "JP24",
  },
  {
    teacher: "Mr Henry Franck",
    day: 4,
    period: 2,
    className: "8 Technology",
    room: "JP16",
  },
  {
    teacher: "Mr Henry Franck",
    day: 4,
    period: 3,
    className: "8 Technology",
    room: "JP16",
  },
  {
    teacher: "Mr Henry Franck",
    day: 4,
    period: 4,
    className: "9 Technology - Animation & Motion Graphics",
    room: "JP25",
  },
  {
    teacher: "Mr Henry Franck",
    day: 4,
    period: 5,
    className: "11 Design & Visual Communication",
    room: "JP24",
  },
  {
    teacher: "Mr Henry Franck",
    day: 4,
    period: 6,
    className: "Free",
    room: "JP24",
  },
  {
    teacher: "Mr Henry Franck",
    day: 5,
    period: 0,
    className: "Tutor",
    room: "JP24",
  },
  {
    teacher: "Mr Henry Franck",
    day: 5,
    period: 1,
    className: "Free",
    room: "JP24",
  },
  {
    teacher: "Mr Henry Franck",
    day: 5,
    period: 2,
    className: "Free",
    room: "JP24",
  },
  {
    teacher: "Mr Henry Franck",
    day: 5,
    period: 3,
    className: "Free",
    room: "JP24",
  },
  {
    teacher: "Mr Henry Franck",
    day: 5,
    period: 4,
    className: "8 Technolgy",
    room: "JP26",
  },
  {
    teacher: "Mr Henry Franck",
    day: 5,
    period: 5,
    className: "9 Technolgy - DVC",
    room: "JP25",
  },
  {
    teacher: "Mr Henry Franck",
    day: 5,
    period: 6,
    className: "11 Design & Visual Communication",
    room: "JP24",
  },
  {
    teacher: "Mr Henry Franck",
    day: 6,
    period: 0,
    className: "Tutor",
    room: "JP24",
  },
  {
    teacher: "Mr Henry Franck",
    day: 6,
    period: 1,
    className: "7 Technology",
    room: "JP25",
  },
  {
    teacher: "Mr Henry Franck",
    day: 6,
    period: 2,
    className: "10 Digital Technolgy",
    room: "JP11",
  },
  {
    teacher: "Mr Henry Franck",
    day: 6,
    period: 3,
    className: "8 Technology",
    room: "JP16",
  },
  {
    teacher: "Mr Henry Franck",
    day: 6,
    period: 4,
    className: "Free",
    room: "JP24",
  },
  {
    teacher: "Mr Henry Franck",
    day: 6,
    period: 5,
    className: "8 Technology",
    room: "JP16",
  },
  {
    teacher: "Mr Henry Franck",
    day: 6,
    period: 6,
    className: "9 Technolgy - DVC",
    room: "JP25",
  },
  {
    teacher: "Mr Henry Franck",
    day: 7,
    period: 0,
    className: "Tutor",
    room: "JP24",
  },
  {
    teacher: "Mr Henry Franck",
    day: 7,
    period: 1,
    className: "11 Design & Visual Communication",
    room: "JP24",
  },
  {
    teacher: "Mr Henry Franck",
    day: 7,
    period: 2,
    className: "11 Design & Visual Communication",
    room: "JP24",
  },
  {
    teacher: "Mr Henry Franck",
    day: 7,
    period: 3,
    className: "Free",
    room: "JP24",
  },
  {
    teacher: "Mr Henry Franck",
    day: 7,
    period: 4,
    className: "8 Technolgy",
    room: "JP16",
  },
  {
    teacher: "Mr Henry Franck",
    day: 7,
    period: 5,
    className: "9 Technolgy - Technology Animation & Motion Graphics",
    room: "JP25",
  },
  {
    teacher: "Mr Henry Franck",
    day: 7,
    period: 6,
    className: "Free",
    room: "JP24",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 1,
    period: 0,
    className: "Tutor",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 1,
    period: 1,
    className: "7 Technology",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 1,
    period: 2,
    className: "9 Technolgy - Design & Visual Communication",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 1,
    period: 3,
    className: "Free",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 1,
    period: 4,
    className: "8 Technology",
    room: "JP16",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 1,
    period: 5,
    className: "8 Technology",
    room: "JP16",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 1,
    period: 6,
    className: "9 Technolgy - Design & Visual Communication",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 2,
    period: 0,
    className: "Tutor",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 2,
    period: 1,
    className: "8 Technolgy",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 2,
    period: 2,
    className: "Free",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 2,
    period: 3,
    className: "9 Technology - Animation & Motion Graphics",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 2,
    period: 4,
    className: "Free",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 2,
    period: 5,
    className: "Free",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 2,
    period: 6,
    className: "8 Technolgy",
    room: "JP16",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 3,
    period: 0,
    className: "Tutor",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 3,
    period: 1,
    className: "9 Technolgy - Design & Visual Communication",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 3,
    period: 2,
    className: "9 Technolgy - Design & Visual Communication",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 3,
    period: 3,
    className: "7 Technolgy",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 3,
    period: 4,
    className: "9 Technology - Animation & Motion Graphics",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 3,
    period: 5,
    className: "Free",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 3,
    period: 6,
    className: "Free",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 4,
    period: 0,
    className: "Tutor",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 4,
    period: 1,
    className: "Free",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 4,
    period: 2,
    className: "Free",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 4,
    period: 3,
    className: "8 Technolgy",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 4,
    period: 4,
    className: "9 Technology - Animation & Motion Graphics",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 4,
    period: 5,
    className: "Free",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 4,
    period: 6,
    className: "Free",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 5,
    period: 0,
    className: "Tutor",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 5,
    period: 1,
    className: "8 Technolgy",
    room: "JP16",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 5,
    period: 2,
    className: "Free",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 5,
    period: 3,
    className: "9 Technolgy - Design & Visual Communication",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 5,
    period: 4,
    className: "8 Technolgy",
    room: "JP16",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 5,
    period: 5,
    className: "7 Technolgy",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 5,
    period: 6,
    className: "9 Technolgy - Animation & Motion Graphics",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 6,
    period: 0,
    className: "Tutor",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 6,
    period: 1,
    className: "Free",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 6,
    period: 2,
    className: "Free",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 6,
    period: 3,
    className: "Free",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 6,
    period: 4,
    className: "9 Technolgy - Design & Visual Communication",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 6,
    period: 5,
    className: "Free",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 6,
    period: 6,
    className: "13 Food Technolgy",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 7,
    period: 0,
    className: "Tutor",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 7,
    period: 1,
    className: "Free",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 7,
    period: 2,
    className: "9 Technolgy - Animation & Motion Graphics",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 7,
    period: 3,
    className: "Free",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 7,
    period: 4,
    className: "Free",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 7,
    period: 5,
    className: "9 Technolgy - Design & Visual Communication",
    room: "JP26",
  },
  {
    teacher: "Ms Jo Horgan",
    day: 7,
    period: 6,
    className: "8 Technolgy",
    room: "JP16",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 1,
    period: 0,
    className: "Tutor",
    room: "JPCOM",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 1,
    period: 1,
    className: "11 Product Design",
    room: "JP14",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 1,
    period: 2,
    className: "11 Product Design",
    room: "JP14",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 1,
    period: 3,
    className: "Free",
    room: "JPCOM",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 1,
    period: 4,
    className: "Free",
    room: "JPCOM",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 1,
    period: 5,
    className: "Free",
    room: "JPCOM",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 1,
    period: 6,
    className: "9 Technology Animation & Motion Graphics",
    room: "JP25",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 2,
    period: 0,
    className: "Tutor",
    room: "JPCOM",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 2,
    period: 1,
    className: "10 Product Design",
    room: "JP14",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 2,
    period: 2,
    className: "10 Product Design",
    room: "JP14",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 2,
    period: 3,
    className: "11 Computer Science",
    room: "JP11",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 2,
    period: 4,
    className: "Free",
    room: "JPCOM",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 2,
    period: 5,
    className: "Free",
    room: "JPCOM",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 2,
    period: 6,
    className: "Free",
    room: "JPCOM",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 3,
    period: 0,
    className: "Tutor",
    room: "JPCOM",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 3,
    period: 1,
    className: "Free",
    room: "JPCOM",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 3,
    period: 2,
    className: "9 Technology Animation & Motion Graphics",
    room: "JP25",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 3,
    period: 3,
    className: "11 Product Design",
    room: "JP14",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 3,
    period: 4,
    className: "11 Computer Science",
    room: "JP11",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 3,
    period: 5,
    className: "Free",
    room: "JPCOM",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 3,
    period: 6,
    className: "Free",
    room: "JPCOM",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 4,
    period: 0,
    className: "Tutor",
    room: "JPCOM",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 4,
    period: 1,
    className: "Free",
    room: "JPCOM",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 4,
    period: 2,
    className: "Free",
    room: "JPCOM",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 4,
    period: 3,
    className: "Free",
    room: "JPCOM",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 4,
    period: 4,
    className: "11 Product Design",
    room: "JP14",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 4,
    period: 5,
    className: "11 Computer Science",
    room: "JP11",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 4,
    period: 6,
    className: "Free",
    room: "JPCOM",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 5,
    period: 0,
    className: "Tutor",
    room: "JPCOM",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 5,
    period: 1,
    className: "Free",
    room: "JPCOM",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 5,
    period: 2,
    className: "Free",
    room: "JPCOM",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 5,
    period: 3,
    className: "9 Technology Animation & Motion Graphics",
    room: "JP25",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 5,
    period: 4,
    className: "10 Product Design",
    room: "JP14",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 5,
    period: 5,
    className: "11 Product Design",
    room: "JP14",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 5,
    period: 6,
    className: "11 Computer Science",
    room: "JP11",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 6,
    period: 0,
    className: "Tutor",
    room: "JPCOM",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 6,
    period: 1,
    className: "Free",
    room: "JPCOM",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 6,
    period: 2,
    className: "Free",
    room: "JPCOM",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 6,
    period: 3,
    className: "9 Technology Animation & Motion Graphics",
    room: "JP25",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 6,
    period: 4,
    className: "10 Product Design",
    room: "JP14",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 6,
    period: 5,
    className: "11 Product Design",
    room: "JP14",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 6,
    period: 6,
    className: "11 Computer Science",
    room: "JP11",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 7,
    period: 0,
    className: "Tutor",
    room: "JPCOM",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 7,
    period: 1,
    className: "11 Computer Science",
    room: "JP11",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 7,
    period: 2,
    className: "11 Computer Science",
    room: "JP11",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 7,
    period: 3,
    className: "Free",
    room: "JPCOM",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 7,
    period: 4,
    className: "Free",
    room: "JPCOM",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 7,
    period: 5,
    className: "Free",
    room: "JPCOM",
  },
  {
    teacher: "Mr Joseph Dunleavy",
    day: 7,
    period: 6,
    className: "Free",
    room: "JPCOM",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 1,
    period: 0,
    className: "Tutor",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 1,
    period: 1,
    className: "13 Animation & Motion Graphics",
    room: "JPCOM",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 1,
    period: 2,
    className: "Free",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 1,
    period: 3,
    className: "Free",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 1,
    period: 4,
    className: "13 Design & Visual Communication",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 1,
    period: 5,
    className: "Free",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 1,
    period: 6,
    className: "12 Design & Visual Communication",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 2,
    period: 0,
    className: "Tutor",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 2,
    period: 1,
    className: "13 Animation & Motion Graphics",
    room: "JPCOM",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 2,
    period: 2,
    className: "13 Animation & Motion Graphics",
    room: "JPCOM",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 2,
    period: 3,
    className: "Free",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 2,
    period: 4,
    className: "Free",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 2,
    period: 5,
    className: "13 Design & Visual Communication",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 2,
    period: 6,
    className: "10 Design & Visual Communication",
    room: "JP25",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 3,
    period: 0,
    className: "Tutor",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 3,
    period: 1,
    className: "12 Design & Visual Communication",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 3,
    period: 2,
    className: "12 Design & Visual Communication",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 3,
    period: 3,
    className: "Free",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 3,
    period: 4,
    className: "Free",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 3,
    period: 5,
    className: "10 Design & Visual Communication",
    room: "JP25",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 3,
    period: 6,
    className: "13 Design & Visual Communication",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 4,
    period: 0,
    className: "Tutor",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 4,
    period: 1,
    className: "10 Design & Visual Communication",
    room: "JP25",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 4,
    period: 2,
    className: "Free",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 4,
    period: 3,
    className: "13 Animation & Motion Graphics",
    room: "JPCOM",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 4,
    period: 4,
    className: "Free",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 4,
    period: 5,
    className: "Free",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 4,
    period: 6,
    className: "Free",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 5,
    period: 0,
    className: "Tutor",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 5,
    period: 1,
    className: "13 Design & Visual Communication",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 5,
    period: 2,
    className: "13 Design & Visual Communication",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 5,
    period: 3,
    className: "12 Design & Visual Communication",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 5,
    period: 4,
    className: "13 Animation & Motion Graphics",
    room: "JPCOM",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 5,
    period: 5,
    className: "Free",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 5,
    period: 6,
    className: "Free",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 6,
    period: 0,
    className: "Tutor",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 6,
    period: 1,
    className: "Free",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 6,
    period: 2,
    className: "10 Design & Visual Communication",
    room: "JP25",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 6,
    period: 3,
    className: "Free",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 6,
    period: 4,
    className: "12 Design & Visual Communication",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 6,
    period: 5,
    className: "13 Animation & Motion Graphics",
    room: "JPCOM",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 6,
    period: 6,
    className: "13 Design & Visual Communication",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 7,
    period: 0,
    className: "Tutor",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 7,
    period: 1,
    className: "Free",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 7,
    period: 2,
    className: "Free",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 7,
    period: 3,
    className: "13 Design & Visual Communication",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 7,
    period: 4,
    className: "Free",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 7,
    period: 5,
    className: "12 Design & Visual Communication",
    room: "JP24",
  },
  {
    teacher: "Mr Shayne Irving",
    day: 7,
    period: 6,
    className: "13 Animation & Motion Graphics",
    room: "JPCOM",
  },
];

// ============================================================
// GLOBAL STATE
// ============================================================

let allLessons = []; // every lesson from the list above
let allTeachers = []; // unique teacher names, sorted A-Z
let currentTeacher = null; // whichever teacher has been clicked

/**
 * Sets the lesson data up and starts everything off
 */
function loadLessons() {
  allLessons = LESSONS.filter((l) => l.teacher);

  const set = new Set(allLessons.map((l) => l.teacher));
  allTeachers = Array.from(set).sort();

  renderList();
  updateUI();
}

/**
 * Works out which period is running, based on the clock.
 * Returns null if it is outside school hours.
 */
function getCurrentPeriod() {
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();

  for (let i = 0; i < SCHOOL_DAY.length; i++) {
    const p = SCHOOL_DAY[i];
    const startParts = p.start.split(":");
    const endParts = p.end.split(":");

    const start =
      parseInt(startParts[0], 10) * 60 + parseInt(startParts[1], 10);
    const end = parseInt(endParts[0], 10) * 60 + parseInt(endParts[1], 10);

    if (mins >= start && mins < end) return p.period;
  }

  return null;
}

/**
 * Stops any awkward characters in the data breaking the page
 */
function escapeHtml(str) {
  if (!str) return "";
  return str.replace(
    /[&<>]/g,
    (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[m] || m,
  );
}

/**
 * Draws the teacher list
 */
function renderList() {
  const container = document.getElementById("teacherListContainer");

  container.innerHTML = allTeachers
    .map((name) => {
      const isSelected = name === currentTeacher;
      return (
        '<div class="teacher ' +
        (isSelected ? "selected" : "") +
        '" data-name="' +
        escapeHtml(name) +
        '">' +
        escapeHtml(name) +
        "</div>"
      );
    })
    .join("");

  attachEvents();
}

/**
 * Shows the location panel. The lesson lookup is switched off for now,
 * so every teacher just shows the not timetabled message.
 */
function showLocation(name) {
  document.getElementById("selectedTeacherName").innerText = name;

  document.getElementById("timetableView").innerHTML =
    '<div class="location"><div class="none">Not currently timetabled</div></div>';
}

/**
 * Shows either the prompt message or the selected teacher's location
 */
function updateUI() {
  const container = document.getElementById("timetableView");
  const title = document.getElementById("selectedTeacherName");

  if (!currentTeacher) {
    title.innerText = "Select a teacher";
    container.innerHTML =
      '<div class="drop-msg"><div class="main">Click a teacher to view their location</div></div>';
  } else {
    showLocation(currentTeacher);
  }
}

/**
 * Selects a teacher and redraws both panels
 */
function selectTeacher(name) {
  if (!name) return;
  currentTeacher = name;
  renderList();
  showLocation(name);
}

/**
 * Click handling for the teacher list
 */
function attachEvents() {
  document.querySelectorAll(".teacher").forEach((el) => {
    const name = el.getAttribute("data-name");
    el.onclick = function () {
      if (name) selectTeacher(name);
    };
  });
}

/**
 * Start the app
 */
function initializeApp() {
  loadLessons();
}

initializeApp();
