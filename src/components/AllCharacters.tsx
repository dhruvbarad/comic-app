// import {CharacterProps} from "./Character";
// import {splitIntoRows} from "../utils/util.ts"
// import Characters from "./Characters";
//
// interface AllCharacterProps {
//     characterType: string
//     characters: CharacterProps[];
// }
//
// const AllCharacters = ({characterType, characters}: AllCharacterProps) => {
//
//     const characterRows: CharacterProps[][] | undefined = splitIntoRows(characters, 5);
//     return (
//         <div className={`container-fluid ${characterType}`}>
//             <h5><a className="link-light" href="/">&lt; Back to home</a></h5>
//             {characters && characterRows ? (
//                 characterRows.map((row) => (
//                     <Characters array={row} header="" characterType={characterType}/>
//                 ))
//             ) : (
//                 <p className="text-center">Loading data...</p>
//             )}
//         </div>
//     );
// }
//
// export default AllCharacters;