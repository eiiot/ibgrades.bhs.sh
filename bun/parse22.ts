const file = Bun.file("ib_pdf.txt");

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

const lines = text.split("\n");

let currentGradeBoundary: GradeBoundary | null = null;

for (const line of lines) {
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

    currentGradeBoundary = {
      subject,
      level,
      subjectOption,
      timezone: parseInt(timezone),
      gradeBoundaries: [],
    };

    gradeBoundaries.push(currentGradeBoundary);
  } else if (line.startsWith("FINAL")) {
    // do nothing
  } else if (line.startsWith("Grade From To")) {
    // do nothing
  } else if (line.startsWith("MAY 2019 Grade boundaries")) {
    // do nothing
  } else if (line.trim() === "") {
    // do nothing
  } else {
    const [grade, from, to] = line.split(" ");

    if (currentGradeBoundary) {
      currentGradeBoundary.gradeBoundaries.push({
        grade,
        from: +from,
        to: +to,
      });
    } else {
      console.error("no current grade boundary");
    }
  }
}

Bun.write(
  "ib_grade_boundaries_19.json",
  JSON.stringify(gradeBoundaries, null, 2)
);
