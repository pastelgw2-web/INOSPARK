
import React, { useState } from 'react';
import { Project, User, UserRole, SkillRequirement } from '../types';

interface ProjectDetailProps {
  project: Project;
  user: User | null;
  onDonation: (amount: number, isRecurring: boolean) => void;
  onVolunteer: (skillId: string, pitch: string) => void;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, user, onDonation, onVolunteer, onBack }) => {
  const [donationAmount, setDonationAmount] = useState<number>(100000);
  const [isRecurring, setIsRecurring] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [volunteerPitch, setVolunteerPitch] = useState('');
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);

  const fundingPercentage = Math.min(100, Math.round((project.currentFunding / project.targetFunding) * 100));

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-semibold mb-6 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Explore
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Content: Image and Description */}
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full aspect-video object-cover"
            />
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full border border-emerald-100">
                {project.category}
              </span>
              <span className="text-slate-400 text-xs font-medium uppercase tracking-widest">
                Started {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{project.title}</h1>
            <p className="text-xl text-slate-600 font-medium mb-8 leading-relaxed italic">
              "{project.tagline}"
            </p>
            
            <div className="prose prose-slate max-w-none text-slate-600 leading-loose">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Innovation Overview</h2>
              <p>{project.description}</p>
              <p className="mt-4">
                This project focuses on leveraging modern technologies to solve critical challenges in {project.category.toLowerCase()}. 
                We are looking for both financial supporters and technical contributors to help us build the prototype and scale.
              </p>
            </div>
          </div>
        </div>

        {/* Right Content: Stats and Actions */}
        <div className="space-y-6">
          {/* Funding Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg shadow-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Support Innovation
            </h3>
            
            <div className="mb-6">
              <div className="flex justify-between items-end mb-2">
                <span className="text-3xl font-black text-slate-900">Rp {project.currentFunding.toLocaleString('id-ID')}</span>
                <span className="text-emerald-600 font-bold text-sm bg-emerald-50 px-2 rounded">{fundingPercentage}%</span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden mb-2">
                <div 
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${fundingPercentage}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Pledged of <strong>Rp {project.targetFunding.toLocaleString('id-ID')}</strong> goal
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 p-3 rounded-2xl text-center">
                <div className="text-xl font-bold text-slate-800">{project.donorsCount}</div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Backers</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl text-center">
                <div className="text-xl font-bold text-slate-800">{project.volunteersCount}</div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Volunteers</div>
              </div>
            </div>

            {!showDonationForm ? (
              <button 
                onClick={() => setShowDonationForm(true)}
                className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 active:scale-95"
              >
                Donate Now
              </button>
            ) : (
              <div className="space-y-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1">Amount (IDR)</label>
                  <input 
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none font-bold"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="recurring" 
                    checked={isRecurring}
                    onChange={(e) => setIsRecurring(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <label htmlFor="recurring" className="text-xs font-bold text-slate-600">Monthly Donation (Recurring)</label>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setShowDonationForm(false)}
                    className="flex-1 py-3 text-slate-500 text-sm font-bold"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => onDonation(donationAmount, isRecurring)}
                    className="flex-[2] py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Volunteer Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg shadow-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Contribute Technical Skills
            </h3>
            
            <div className="space-y-3 mb-6">
              {project.requirements.map(req => (
                <div key={req.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                  <div>
                    <div className="text-sm font-bold text-slate-700">{req.name}</div>
                    <div className="text-[10px] text-slate-400">{req.totalSlots - req.filledSlots} slots remaining</div>
                  </div>
                  <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-xs font-black text-emerald-600">
                    {req.filledSlots}/{req.totalSlots}
                  </div>
                </div>
              ))}
            </div>

            {!showVolunteerForm ? (
              <button 
                onClick={() => {
                  if (!user) {
                    alert("Please sign in to volunteer!");
                    return;
                  }
                  setShowVolunteerForm(true);
                }}
                className="w-full py-4 border-2 border-orange-500 text-orange-600 font-bold rounded-2xl hover:bg-orange-50 transition-all active:scale-95"
              >
                Apply as Volunteer
              </button>
            ) : (
              <div className="space-y-4 p-4 bg-orange-50/50 rounded-2xl border border-orange-100">
                <div>
                  <label className="text-xs font-bold text-orange-600 block mb-1">Select Skill to Apply</label>
                  <select 
                    value={selectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                    className="w-full p-3 rounded-xl border border-orange-200 focus:ring-2 focus:ring-orange-500 outline-none text-sm font-bold bg-white"
                  >
                    <option value="">Choose skill...</option>
                    {project.requirements.filter(r => r.filledSlots < r.totalSlots).map(r => (
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-orange-600 block mb-1">Your Pitch / Experience</label>
                  <textarea 
                    value={volunteerPitch}
                    onChange={(e) => setVolunteerPitch(e.target.value)}
                    placeholder="Why are you the best fit for this role?"
                    className="w-full p-3 rounded-xl border border-orange-200 focus:ring-2 focus:ring-orange-500 outline-none text-sm min-h-[100px] bg-white"
                  />
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setShowVolunteerForm(false)}
                    className="flex-1 py-3 text-slate-500 text-sm font-bold"
                  >
                    Cancel
                  </button>
                  <button 
                    disabled={!selectedSkill || !volunteerPitch}
                    onClick={() => onVolunteer(selectedSkill, volunteerPitch)}
                    className="flex-[2] py-3 bg-orange-500 text-white rounded-xl text-sm font-bold disabled:opacity-50"
                  >
                    Submit Pitch
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
