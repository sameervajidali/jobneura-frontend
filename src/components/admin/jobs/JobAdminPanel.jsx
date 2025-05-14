// // src/components/admin/jobs/JobAdminPanel.jsx
// import React, { useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Select, SelectItem } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
// import { Pencil, Trash2 } from "lucide-react";
// import jobService from "@/services/jobService";
// import { format } from "date-fns";

// const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];
// const WORK_TYPES = ["Remote", "Hybrid", "Onsite"];
// const STATUS_TYPES = ["published", "draft", "archived"];

// export default function JobAdminPanel() {
//   const [jobs, setJobs] = useState([]);
//   const [filters, setFilters] = useState({
//     search: "",
//     jobType: "",
//     workType: "",
//     status: ""
//   });

//   const fetchJobs = async () => {
//     const res = await jobService.getAllAdmin(filters);
//     setJobs(res);
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, [filters]);

//   return (
//     <div className="p-6 space-y-4">
//       <div className="flex flex-wrap gap-4 items-end">
//         <Input
//           placeholder="Search by title or company"
//           className="w-64"
//           value={filters.search}
//           onChange={(e) => setFilters(f => ({ ...f, search: e.target.value }))}
//         />
//         <Select
//           value={filters.jobType}
//           onValueChange={(val) => setFilters(f => ({ ...f, jobType: val }))}
//         >
//           <SelectItem value="">All Job Types</SelectItem>
//           {JOB_TYPES.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
//         </Select>
//         <Select
//           value={filters.workType}
//           onValueChange={(val) => setFilters(f => ({ ...f, workType: val }))}
//         >
//           <SelectItem value="">All Work Types</SelectItem>
//           {WORK_TYPES.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
//         </Select>
//         <Select
//           value={filters.status}
//           onValueChange={(val) => setFilters(f => ({ ...f, status: val }))}
//         >
//           <SelectItem value="">All Status</SelectItem>
//           {STATUS_TYPES.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
//         </Select>
//       </div>

//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableCell>Title</TableCell>
//             <TableCell>Company</TableCell>
//             <TableCell>Location</TableCell>
//             <TableCell>Type</TableCell>
//             <TableCell>Skills</TableCell>
//             <TableCell>Status</TableCell>
//             <TableCell>Posted</TableCell>
//             <TableCell>Actions</TableCell>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {jobs.map((job) => (
//             <TableRow key={job._id}>
//               <TableCell className="font-medium">{job.title}</TableCell>
//               <TableCell>{job.company}</TableCell>
//               <TableCell>{job.location}</TableCell>
//               <TableCell>
//                 <Badge variant="outline">{job.jobType}</Badge>
//                 <Badge variant="outline" className="ml-1">{job.workType}</Badge>
//               </TableCell>
//               <TableCell className="flex flex-wrap gap-1">
//                 {(job.skills || []).map(skill => (
//                   <Badge key={skill} variant="secondary">{skill}</Badge>
//                 ))}
//               </TableCell>
//               <TableCell>
//                 <Badge variant={job.status === "published" ? "default" : "outline"}>{job.status}</Badge>
//               </TableCell>
//               <TableCell>{format(new Date(job.createdAt), 'dd MMM yyyy')}</TableCell>
//               <TableCell>
//                 <div className="flex gap-2">
//                   <Button size="icon" variant="outline"><Pencil className="w-4 h-4" /></Button>
//                   <Button size="icon" variant="destructive"><Trash2 className="w-4 h-4" /></Button>
//                 </div>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

export default function JobAdminPanel() {
  return <p>✅ JobAdminPanel Mounted</p>;
}
