import React from "react";

const CharacterDetails = ({details}: Record<string, any>) => {
    if (details.id == undefined) {
        return <p>Loading...</p>; // Or null
    }
    return (
        <div className="max-w-5xl mx-auto rounded shadow">
            <div className="flex flex-col items-center">
                <img
                    src={details.image.url}
                    alt={details.name}
                    className="w-48 h-48 object-cover rounded mb-4"
                />
                <h1 className="text-3xl font-bold mb-2">{details.name}</h1>
                <p className="text-gray-600 mb-4">{details.biography["full-name"]}</p>
            </div>
            <section className="mb-6">
                <h2 className={`text-xl font-semibold mb-2 flex flex-col items-center card-title ${details.type}-box-shadow`}>Power
                    Stats</h2>
                <ul className="grid grid-cols-2 gap-2">
                    {Object.entries(details.powerstats).map(([stat, value]) => (
                        <li><strong>{stat.charAt(0).toUpperCase() + stat.slice(1)}:</strong></li>
                    ))}
                </ul>
            </section>
            <section className="mb-6">
                <h2 className={`text-xl font-semibold mb-2 flex flex-col items-center card-title ${details.type}-box-shadow`}>Biography</h2>
                <ul className="grid grid-cols-2">
                    <li><strong>Alter Egos:</strong> {details.biography["alter-egos"]}</li>
                    <li><strong>Place of Birth:</strong> {details.biography["place-of-birth"]}</li>
                </ul>
                <ul className="grid grid-cols-2">
                    <li><strong>Aliases:</strong> {details.biography.aliases.join(", ")}</li>
                    <li><strong>First Appearance:</strong> {details.biography["first-appearance"]}</li>
                    <li><strong>Alignment:</strong> {details.biography.alignment}</li>
                </ul>
            </section>
            <section className="mb-6">
                <h2 className={`text-xl font-semibold mb-2 flex flex-col items-center card-title ${details.type}-box-shadow`}>Appearance</h2>
                <ul className="grid grid-cols-3">
                    <li><strong>Gender:</strong> {details.appearance.gender}</li>
                    <li><strong>Race:</strong> {details.appearance.race}</li>
                    <li><strong>Height:</strong> {details.appearance.height.join(" / ")}</li>
                </ul>
                <ul className="grid grid-cols-3">
                    <li><strong>Weight:</strong> {details.appearance.weight.join(" / ")}</li>
                    <li><strong>Eye Color:</strong> {details.appearance["eye-color"]}</li>
                    <li><strong>Hair Color:</strong> {details.appearance["hair-color"]}</li>
                </ul>
            </section>
            <section className="mb-6">
                <h2 className={`text-xl font-semibold mb-2 flex flex-col items-center card-title ${details.type}-box-shadow`}>Work</h2>
                <ul>
                    <li><strong>Occupation:</strong> {details.work.occupation}</li>
                    <li><strong>Base:</strong> {details.work.base}</li>
                </ul>
            </section>
            <section className="mb-6">
                <h2 className={`text-xl font-semibold mb-2 flex flex-col items-center card-title ${details.type}-box-shadow`}>Connections</h2>
                <ul>
                    <li><strong>Group Affiliation:</strong> {details.connections["group-affiliation"]}</li>
                    <li><strong>Relatives:</strong> {details.connections.relatives}</li>
                </ul>
            </section>
        </div>
    );
};

export default CharacterDetails;
