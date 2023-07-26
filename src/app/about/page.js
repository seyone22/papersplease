const About = () => {
    const creators = [
        {name: 'S.G.Seyone', email: 's.g.seyone@live.com'},
        {name: 'M.G.Sonali.K.Jayarathne', email: 'sonalikalpani@outlook.com'},
        {name: 'Menakan Vijayanathan', email: 'kingshipmena@gmail.com'}
    ];

    return (
        <div>
            <h1>University of Vavuniya Exam Hub</h1>
            <h2>About</h2>
            <p>
                The University of Vavuniya Exam Hub is a platform dedicated to storing, retrieving, viewing, and
                updating past paper questions and answers. It is designed and developed by 2nd-year ICT students,
                S.G.Seyone (2019/ICT/46) M.G.Sonali.K.Jayarathne (2019/ICT/108) and Menakan Vijayanathan (2019/ICT/45).
            </p>
            <h2>Creators</h2>
            <ul>
                {creators.map((creator) => (
                    <li key={creator.name}>
                        {creator.name}: <a href={`mailto:${creator.email}`}>{creator.email}</a>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default About;