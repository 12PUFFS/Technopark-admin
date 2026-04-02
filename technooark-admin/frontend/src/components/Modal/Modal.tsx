// import { useState } from 'react';
// import './Modal.css';

// export default function Modal({ modalDefault, modalState, onLogin, userRole }) {
//   const [inputValue, setInputValue] = useState('');

//   return (
//     modalDefault && (
//       <div onClick={() => modalState(false)} className="modal-wrapper">
//         <div onClick={(e) => e.stopPropagation()} className="modal">
//           <div className="modal-input">
//             <input
//               placeholder="Введите код доступа MAX"
//               type="text"
//               value={inputValue}
//               onChange={(e) => {
//                 setInputValue(e.target.value);
//               }}
//             />
//           </div>
//           <button
//             onClick={() => {
//               if (inputValue === userRole.admin.password) {
//                 onLogin(userRole.admin);
//                 modalState(false);
//               } else if (inputValue === userRole.user.password) {
//                 onLogin(userRole.user);
//                 modalState(false);
//               } else {
//                 setInputValue('');
//               }
//             }}
//             className="modal-btn"
//           >
//             Подтвердить код
//           </button>
//         </div>
//       </div>
//     )
//   );
// }
