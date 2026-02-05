
import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const fundingPercentage = Math.min(100, Math.round((project.currentFunding / project.targetFunding) * 100));
  
  return (
    <div 
      className="group bg-white rounded-[2.5rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] transition-all duration-700 border border-slate-50 overflow-hidden cursor-pointer flex flex-col hover:-translate-y-2"
      onClick={onClick}
    >
      <div className="relative h-60 overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="absolute top-5 right-5 glass-morphism px-4 py-2 rounded-2xl text-[10px] font-black text-slate-800 uppercase tracking-widest">
          {project.category}
        </div>
      </div>
      
      <div className="p-8 flex-1 flex flex-col">
        <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-primary transition-colors leading-tight">
          {project.title}
        </h3>
        <p className="text-[13px] text-slate-500 line-clamp-2 mb-6 leading-relaxed font-medium">
          {project.tagline}
        </p>
        
        <div className="mt-auto space-y-6">
          {/* Funding Progress */}
          <div>
            <div className="flex justify-between items-end mb-2.5">
              <div className="flex flex-col">
                <span className="text-xs font-black text-slate-900">
                  Rp {project.currentFunding.toLocaleString('id-ID')}
                </span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Raised</span>
              </div>
              <span className="text-[11px] font-black text-primary bg-primary/5 px-2.5 py-1 rounded-lg">
                {fundingPercentage}%
              </span>
            </div>
            <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${fundingPercentage}%` }}
              />
            </div>
          </div>

          {/* Stats Simplified */}
          <div className="pt-5 border-t border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
               <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                     <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${project.id+i}`} alt="" />
                   </div>
                 ))}
               </div>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{project.donorsCount}+ Backers</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
