import { NextResponse } from 'next/server'
import './globals.css'
import { Inter } from 'next/font/google'

const About = () => {
  const creators = [
    { name: 'S.G.Seyone', email: 's.g.seyone@live.com' },
    { name: 'M.G.Sonali.K.Jayarathne', email: 'sonalikalpani@outlook.com' },
  ];

  return (
    <div>
      <h1>University of Vavuniya Exam Hub</h1>
      <h2>About</h2>
      <p>
        The University of Vavuniya Exam Hub is a platform dedicated to storing, retrieving, viewing, and updating past paper questions and answers. It is designed and developed by 2nd-year ICT students, S.G.Seyone (2019/ICT/46) and M.G.Sonali.K.Jayarathne (2019/ICT/108).
      </p>
      <h2>Creators</h2>
      <ul>
        {creators.map((creator) => (
          <li key={creator.name}>
            {creator.name}: <a href={`mailto:${creator.email}`}>{creator.email}</a>
          </li>
        ))}
      </ul>
      <Link href="/">Go back to homepage</Link>
    </div>
  );
};

export default About;
