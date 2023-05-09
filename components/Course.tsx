import LightChart from "./LightChart";

export interface CourseType {
  subject: string;
  level: string;
  subjectOption: string;
  timezone: number;
  gradeBoundaries: Boundary[];
}

export interface Boundary {
  grade: string;
  from: number;
  to: number;
}

interface CourseProps {
  course: CourseType;
}

const Course = ({ course }: CourseProps) => {
  return (
    <div className="w-full flex flex-col space-y-2">
      <div className="w-full flex flex-row justify-start space-x-2">
        <h3 className="truncate">{course.subjectOption}</h3>
        <h3 className="!mr-2">[{course.level}]</h3>
        <h3 className="!ml-auto whitespace-nowrap">TZ: {course.timezone}</h3>
      </div>
      <LightChart boundaries={course.gradeBoundaries} />
      <table className="">
        <thead>
          <tr>
            <th className="text-left font-normal text-neutral-600 ">Grade</th>
            <th className="text-left font-normal text-neutral-600 ">From</th>
            <th className="text-left font-normal text-neutral-600 ">To</th>
          </tr>
        </thead>
        <tbody>
          {course.gradeBoundaries.map((boundary) => (
            <tr key={boundary.grade}>
              <td>{boundary.grade}</td>
              <td>{boundary.from}%</td>
              <td>{boundary.to}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Course;
