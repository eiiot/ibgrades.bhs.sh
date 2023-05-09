"use client";

import Course, { CourseType } from "@/components/Course";
import { useState, useEffect } from "react";
const courses: CourseType[] = require("@/data/boundaries.json");
import { useDebounce } from "usehooks-ts";

const sortCourses = (
  sort: "a-z" | "hardest" | "easiest",
  courses: CourseType[]
) => {
  // hardest and easiest refer to the percentage needed to get a 7
  if (sort === "easiest") {
    return courses.sort((a, b) => {
      return (
        a.gradeBoundaries[a.gradeBoundaries.length - 1].from -
        b.gradeBoundaries[b.gradeBoundaries.length - 1].from
      );
    });
  }
  if (sort === "hardest") {
    return courses.sort((a, b) => {
      return (
        b.gradeBoundaries[b.gradeBoundaries.length - 1].from -
        a.gradeBoundaries[a.gradeBoundaries.length - 1].from
      );
    });
  }

  return courses.sort((a, b) => {
    if (a.subject < b.subject) return -1;
    if (a.subject > b.subject) return 1;
    return 0;
  });
};

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<"a-z" | "hardest" | "easiest">("a-z");
  const [filter, setFilter] = useState<"none" | "hl" | "sl">("none");

  const filteredCourses = courses.filter((c) => {
    if (filter === "hl") return c.level === "HL";
    if (filter === "sl") return c.level === "SL";
    return true;
  });

  const sortedCourses = sortCourses(sort, filteredCourses);

  const finalCourses = sortedCourses.filter((c) =>
    c.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="flex max-w-2xl min-h-screen mx-auto flex-col space-y-4 p-8">
      <h1 className="text-2xl">
        IB Grade Boundaries{" "}
        <span className="text-neutral-600 whitespace-nowrap">(May 2021)</span>
      </h1>
      <span className="text-neutral-600">
        Created by{" "}
        <a href="https://eliothertenstein.com" className="text-white">
          eliot
        </a>
      </span>

      <div className="w-full flex flex-col-reverse md:space-y-0 md:flex-row border-b-[1px] border-b-neutral-600 pb-1">
        <input
          className="bg-black flex-1 outline-none w-full ring-none placeholder:text-neutral-600"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex-none space-x-2 mb-2 md:mb-0 flex flex-row">
          <span className="flex-nowrap">
            <label htmlFor="sort" className="mr-2">
              Sort
            </label>
            <select
              className="bg-black outline-none ring-none placeholder:text-neutral-600"
              id="sprt"
              onChange={(e) => setSort(e.target.value as any)}
            >
              <option value="a-z">A-Z</option>
              <option value="hardest">Hardest</option>
              <option value="easiest">Easiest</option>
            </select>
          </span>
          <span className="flex-nowrap">
            <label htmlFor="filter" className="mr-2">
              Filter
            </label>
            <select
              className="bg-black outline-none ring-none placeholder:text-neutral-600"
              id="sprt"
              onChange={(e) => setFilter(e.target.value as any)}
            >
              <option value="none">None</option>
              <option value="hl">HL</option>
              <option value="sl">SL</option>
            </select>
          </span>
        </div>
      </div>
      {finalCourses.map((c, i) => (
        <Course key={i} course={c} />
      ))}
    </main>
  );
}
