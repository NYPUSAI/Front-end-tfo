// import React, { useState } from 'react';
// import { Plus, Info, History, ChevronDown, ChevronRight } from 'lucide-react';

// const ChatInterface = () => {
//   const [isHRExpanded, setIsHRExpanded] = useState(true);

//   return (
//     <div className="w-full max-w-5xl border border-gray-300 rounded-lg bg-white p-4">
//       <div className="flex justify-between mb-4">
//         <div className="flex items-center gap-2">
//           <div className="bg-yellow-300 px-3 py-1 rounded">Teams</div>
//           <div>IVA</div>
//         </div>
//         <button className="border border-gray-300 px-3 py-1 rounded">
//           Raise a Ticket
//         </button>
//       </div>

//       <div className="flex gap-4 h-[500px]">
//         <div className="w-1/4 border border-gray-300 rounded">
//           <div 
//             className="bg-yellow-300 p-2 flex items-center gap-2 cursor-pointer"
//             onClick={() => setIsHRExpanded(!isHRExpanded)}
//           >
//             {isHRExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
//             HR Department
//           </div>
//           {isHRExpanded && (
//             <>
//               <div className="pl-6 p-2 flex items-center justify-between">
//                 <span>Recruitment Team</span>
//                 <Info size={16} />
//               </div>
//               <div className="pl-6 p-2 flex items-center justify-between bg-yellow-300">
//                 <span>Onboarding Team</span>
//                 <Info size={16} />
//               </div>
//             </>
//           )}
//           <div className="p-2">Marketing Dept</div>
//           <div className="p-2">Sales Department</div>
//         </div>

//         <div className="flex-1 flex flex-col">
//           <div className="flex items-center justify-between border-b pb-2 mb-2">
//             <span>Chat ID: ##</span>
//             <History size={16} className="text-gray-500" />
//           </div>

//           <div className="flex-1 relative">
//             <div className="absolute right-4 top-4 max-w-[200px]">
//               <div className="bg-yellow-300 p-4 rounded-lg mb-2">
//                 Hi...
//               </div>
//               <div className="text-gray-500 text-sm text-center">
//                 (Suggested next steps or questions)
//               </div>
//             </div>
//           </div>

//           <div className="mt-auto">
//             <div className="border rounded-full p-2 mb-2 text-gray-400 text-center">
//               (Chat)
//             </div>
//             <div className="flex items-center gap-2 border rounded-lg p-2">
//               <Plus size={20} className="text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Type here"
//                 className="flex-1 outline-none"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatInterface;