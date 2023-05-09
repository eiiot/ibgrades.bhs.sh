const file = Bun.file("2019_pdf.txt");

const text = await file.text();

// remove all newlines that are two or more in a row (keep single line breaks)

const fixedText = text.replace(/\n{2,}/g, "\n");

// Subject: NOS Level: SL Subject option: NATURE OF SCIENCE Timezone: 0
// FINAL
// Grade From To
// 1 0 7
// 2 8 20
// 3 21 37
// 4 38 44
// 5 45 56
// 6 57 64
// 7 65 100
// Subject: FILM Level: HL Subject option: FILM Timezone: 0
// FINAL
// Grade From To
// 1 0 4
// 2 5 24
// 3 25 35
// 4 36 51
// 5 52 68
// 6 69 81
// 7 82 100

// the file contains a list of IB grade boundaries in the above format.
// Note that there is no newline between the last line of one subject and the first line of the next subject.
// Create a JSON object with the following structure:

interface GradeBoundary {
  subject: string;
  level: string;
  subjectOption: string;
  timezone: number;
  gradeBoundaries: {
    grade: string;
    from: number;
    to: number;
  }[];
}

// The JSON object should be an array of GradeBoundary objects.
// For any gradeboundraies that don't fit the format, log them so they can be fixed manually.

const gradeBoundaries: GradeBoundary[] = [];

const lines = text.split("\n").map((line) => line.trim());

// remove any lines between a line that starts with "Subject: " and a line that starts with "FINAL"

const finalLineGroups: string[][] = [];
let thisGroup: string[] = [];

for (const line of lines) {
  if (line.startsWith("Subject: ")) {
    if (thisGroup.length !== 0) {
      console.log("pushing group");
      console.log(thisGroup);
      finalLineGroups.push(thisGroup);
      thisGroup = [];
    }
  }

  thisGroup.push(line);
}

console.log(finalLineGroups);

finalLineGroups.forEach((group, index) => {
  // get the first occurance of "Grade", and split the group into two arrays, one before the grade, and one after

  const gradeIndex = group.findIndex((line) => line.startsWith("Grade"));

  const beforeGrade = group.slice(0, gradeIndex);

  let gradeBoundary: GradeBoundary = {
    subject: "",
    level: "",
    subjectOption: "",
    timezone: 0,
    gradeBoundaries: [],
  };

  for (const line of beforeGrade) {
    if (line.startsWith("Subject: ")) {
      // const [subject, level, subjectOption, timezone] = line
      //   .replace('Subject: ', '')
      //   .replace('Level: ', '')
      //   .replace('Subject option: ', '')
      //   .replace('Timezone: ', '')
      //   .split(' ');
      // account for the fact that subject option can have spaces

      const subject = line.replace("Subject: ", "").split("Level: ")[0].trim();
      const level = line
        .replace("Subject: ", "")
        .split("Level: ")[1]
        .split("Subject option: ")[0]
        .trim();
      const subjectOption = line
        .replace("Subject: ", "")
        .split("Level: ")[1]
        .split("Subject option: ")[1]
        .split("Timezone: ")[0]
        .trim();
      const timezone = line
        .replace("Subject: ", "")
        .split("Level: ")[1]
        .split("Subject option: ")[1]
        .split("Timezone: ")[1]
        .trim();

      gradeBoundary = {
        subject,
        level,
        subjectOption,
        timezone: +timezone,
        gradeBoundaries: [],
      };
    }
  }

  console.log(gradeBoundary);

  const afterGrade = group.slice(gradeIndex);

  const gradeCount = afterGrade.filter((line) =>
    line.startsWith("Grade")
  ).length;

  // we want to get every nth group of 3, where n is the number of grades in the group
  // so if there are 5 grades, we want to save indexes 12, 13, 14 and 29, 28, 29, etc.
  // notice the patern here - we want the indexs of the 13, 14th and 15th item, then the 28th, 29th and 30th item, etc.
  // so the rule for the indexes that we want is basically the 3 indexes before the next multiple of the gradeCount * 3

  const wantedIndexes: number[] = [];

  for (let i = 0; i <= afterGrade.length; i++) {
    if (i % (gradeCount * 3) === 0 && i !== 0) {
      wantedIndexes.push(i - 3);
      wantedIndexes.push(i - 2);
      wantedIndexes.push(i - 1);
    }
  }

  // now we have the indexes of the lines we want to parse, so we can parse them

  const wantedGroupLong = wantedIndexes.map((index) => afterGrade[index]);

  // now we group the wantedGroup into groups of 3

  const wantedGroups: string[][] = [];

  for (let i = 3; i < wantedGroupLong.length; i += 3) {
    wantedGroups.push(wantedGroupLong.slice(i, i + 3));
  }

  // now, we can add the grade boundaries to the currentGradeBoundary

  wantedGroups.forEach((smallGroup) => {
    const [grade, from, to] = smallGroup;

    gradeBoundary.gradeBoundaries.push({
      grade,
      from: +from,
      to: +to,
    });
  });

  gradeBoundaries.push(gradeBoundary);
});

Bun.write(
  "ib_grade_boundaries_2019.json",
  JSON.stringify(gradeBoundaries, null, 2)
);
