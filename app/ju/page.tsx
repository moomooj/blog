"use client";

import Image from "next/image";
import Link from "next/link";

export default function Ju() {
  return (
    <div className="max-w-4xl mx-auto py-20">
      <section className="mb-16 text-center">
        <div className="flex items-center justify-center">
          <Image
            width={300}
            height={300}
            src={`https://imagedelivery.net/zRDsOnXdrMQRT3BoRETbLA/e255fb3f-9dd0-4bc8-4fe8-4063756dbc00/avatar`}
            alt="JuyoungOh"
            className=" rounded-full overflow-hidden"
          />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Juyoung Oh (JU)
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Front-End Developer | Vancouve, BC
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="https://github.com/moomooj"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="mailto:bunnyju0@gmail.com"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Contact Me
          </Link>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About Me</h2>
        <p className="text-gray-600 leading-relaxed">
          I specialize in crafting responsive, dynamic, and user-friendly web
          applications using modern frontend technologies. My expertise lies in
          building seamless user experiences with a strong focus on performance,
          accessibility, and maintainability. By leveraging frameworks such as
          React.js and Next.js, I create scalable solutions that meet business
          needs while ensuring an intuitive interface for end-users.
        </p>
        <br />
        <p>
          My passion lies in turning complex requirements into clean,
          maintainable, and scalable code, always prioritizing code quality and
          performance optimization.
        </p>
        <br />
        <p>
          Furthermore, I actively stay updated with the latest industry trends
          and best practices, ensuring that the applications I build align with
          modern standards and deliver an exceptional user experience across
          various devices and platforms.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Languages</h3>
            <ul className="text-gray-600 space-y-1">
              <li>JavaScript</li>
              <li>TypeScript</li>
              <li>C#</li>
              <li>Java</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Frontend</h3>
            <ul className="text-gray-600 space-y-1">
              <li>React.js</li>
              <li>Next.js</li>
              <li>Three.js</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Backend</h3>
            <ul className="text-gray-600 space-y-1">
              <li>Node.js</li>
              <li>Express.js</li>
              <li>PostgreSQL</li>
              <li>MongoDB</li>
              <li>SQL</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">DevOps & Tools</h3>
            <ul className="text-gray-600 space-y-1">
              <li>Git & GitHub</li>
              <li>AWS (S3, EC2, RDS)</li>
              <li>Docker</li>
              <li>CI/CD (GitHub Actions)</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg md:col-span-4">
            <h3 className="font-semibold mb-2">Libraries & Frameworks</h3>
            <ul className="text-gray-600 space-y-1">
              <li>Redux, Zustand,Recoil, Axios, React Query, Jest</li>
              <li>Prisma, Rtf, Styled Components, Tailwind CSS, etc</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Featured Projects
        </h2>
        <div className="flex flex-col gap-6">
          <Link href={"/"} className="text-gray-900">
            <div className="space-y-8">
              <div className="bg-white hover:bg-blue-50 p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold mb-2">DevLog</h3>
                  <span className="text-xs text-gray-500">20/12/2024 -</span>
                </div>

                <p className="text-gray-600 mb-4">
                  A blogging platform for developers to share their knowledge
                  and experiences. Built with Next.js, Prisma, and PostgreSQL.
                </p>
                <div className="flex gap-2 items-center">
                  <span className="px-3 py-1 bg-gray-100 text-sm rounded-full">
                    Next.js
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-sm rounded-full">
                    Prisma
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-sm rounded-full">
                    PostgreSQL
                  </span>
                </div>
              </div>
            </div>
          </Link>
          <Link
            href={"https://moomooj.github.io/my-room/"}
            className="text-gray-900"
          >
            <div className="space-y-8">
              <div className="bg-white hover:bg-blue-50 p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold mb-2">My Room</h3>
                  <span className="text-xs text-gray-500">23/11/2023</span>
                </div>

                <p className="text-gray-600 mb-4">
                  With Three.js, I was able to bring my space to life with
                  interactive 3D elements! Built with ReactThreeFiber, recil,
                  React.
                </p>
                <div className="flex gap-2 items-center">
                  <span className="px-3 py-1 bg-gray-100 text-sm rounded-full">
                    React.js
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-sm rounded-full">
                    Three.js
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-sm rounded-full">
                    styled-components
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-sm rounded-full">
                    recoil
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Experience</h2>
        <div className="space-y-8">
          <div className="flex flex-col gap-8">
            <div className="bg-white  p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Front-End Developer
                </h3>
                <span className="text-sm text-gray-500">2023</span>
              </div>
              <p className="text-gray-600  mb-4">Fave</p>
              <ul className="text-gray-600 list-disc pl-5 space-y-2">
                <li>Worked on 3D web projects in collaboration with Samsung</li>
                <li>
                  Designed and implemented interactive web elements for enhanced
                  user experience
                </li>
                <li>
                  Optimized website performance, reducing load times by 30%
                </li>
              </ul>
            </div>
            <div className="bg-white  p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Front-End Developer
                </h3>
                <span className="text-sm text-gray-500">2022 - 2023</span>
              </div>
              <p className="text-gray-600  mb-4">Whatis</p>
              <ul className="text-gray-600 list-disc pl-5 space-y-2">
                <li>
                  Developed the front-end of a learning management system (LMS)
                </li>
                <li>
                  Integrated dynamic features like quizzes, assignments, and
                  feedback forms
                </li>
                <li>
                  Ensured mobile responsiveness and cross-browser compatibility
                </li>
                <li>
                  Worked closely with back-end developers to integrate APIs and
                  services
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Education</h2>
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Douglas College</h3>
              <p className="text-gray-500">2025 - Present</p>
            </div>
            <p className="text-gray-600">
              Computing Studies and Information Systems
            </p>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">ILAC Language school</h3>
              <p className="text-gray-500">2024</p>
            </div>
            <p className="text-gray-600">Academic English</p>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Naver boostcamp</h3>
              <p className="text-gray-500">2023</p>
            </div>
            <p className="text-gray-600">Web·App (Front-End)</p>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Green Computer Academy</h3>
              <p className="text-gray-500">2021</p>
            </div>
            <p className="text-gray-600">Programming Introduction</p>
          </div>
        </div>
      </section>
    </div>
  );
}
