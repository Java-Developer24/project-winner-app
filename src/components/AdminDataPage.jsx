'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import FloatingNav from './FloatingNav';
import { Trophy, Users, Sparkles } from 'lucide-react';

// 20 random guide data entries
const guideData = [
  { id: 1, name: 'Rajesh Kumar', email: 'rajesh.k@email.com', phone: '+91 98765 43210', city: 'Mumbai', entries: 5 },
  { id: 2, name: 'Priya Sharma', email: 'priya.sharma@email.com', phone: '+91 98765 43211', city: 'Delhi', entries: 3 },
  { id: 3, name: 'Amit Patel', email: 'amit.patel@email.com', phone: '+91 98765 43212', city: 'Ahmedabad', entries: 7 },
  { id: 4, name: 'Sneha Reddy', email: 'sneha.r@email.com', phone: '+91 98765 43213', city: 'Bangalore', entries: 2 },
  { id: 5, name: 'Vikram Singh', email: 'vikram.singh@email.com', phone: '+91 98765 43214', city: 'Jaipur', entries: 4 },
  { id: 6, name: 'Ananya Iyer', email: 'ananya.iyer@email.com', phone: '+91 98765 43215', city: 'Chennai', entries: 6 },
  { id: 7, name: 'Rohan Gupta', email: 'rohan.g@email.com', phone: '+91 98765 43216', city: 'Kolkata', entries: 3 },
  { id: 8, name: 'Pooja Desai', email: 'pooja.desai@email.com', phone: '+91 98765 43217', city: 'Pune', entries: 5 },
  { id: 9, name: 'Arjun Nair', email: 'arjun.nair@email.com', phone: '+91 98765 43218', city: 'Kochi', entries: 2 },
  { id: 10, name: 'Kavya Menon', email: 'kavya.m@email.com', phone: '+91 98765 43219', city: 'Hyderabad', entries: 8 },
  { id: 11, name: 'Siddharth Joshi', email: 'sid.joshi@email.com', phone: '+91 98765 43220', city: 'Surat', entries: 4 },
  { id: 12, name: 'Neha Kapoor', email: 'neha.kapoor@email.com', phone: '+91 98765 43221', city: 'Chandigarh', entries: 3 },
  { id: 13, name: 'Karthik Raman', email: 'karthik.r@email.com', phone: '+91 98765 43222', city: 'Coimbatore', entries: 5 },
  { id: 14, name: 'Divya Pillai', email: 'divya.pillai@email.com', phone: '+91 98765 43223', city: 'Trivandrum', entries: 6 },
  { id: 15, name: 'Aditya Verma', email: 'aditya.v@email.com', phone: '+91 98765 43224', city: 'Lucknow', entries: 2 },
  { id: 16, name: 'Ishita Malhotra', email: 'ishita.m@email.com', phone: '+91 98765 43225', city: 'Indore', entries: 7 },
  { id: 17, name: 'Rahul Mehta', email: 'rahul.mehta@email.com', phone: '+91 98765 43226', city: 'Nagpur', entries: 4 },
  { id: 18, name: 'Shreya Saxena', email: 'shreya.s@email.com', phone: '+91 98765 43227', city: 'Bhopal', entries: 3 },
  { id: 19, name: 'Varun Khanna', email: 'varun.khanna@email.com', phone: '+91 98765 43228', city: 'Ludhiana', entries: 5 },
  { id: 20, name: 'Tanvi Shah', email: 'tanvi.shah@email.com', phone: '+91 98765 43229', city: 'Vadodara', entries: 6 },
];

export default function AdminDataPage() {
  const [selectedWinner, setSelectedWinner] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const pickRandomWinner = () => {
    setIsSpinning(true);
    setSelectedWinner(null);

    // Simulate spinning animation
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * guideData.length);
      setSelectedWinner(guideData[randomIndex]);
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: 'radial-gradient(circle at 30% -20%, #ff4fd9 0%, #6d2bff 45%, #0c022a 100%)' }}>
      <FloatingNav />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-10 h-10 text-purple-400" />
            <h1 className="text-5xl md:text-7xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
              Admin Data
            </h1>
          </div>
          <p className="text-xl text-purple-200">
            20 Registered Guides - Pick a Random Winner
          </p>
        </motion.div>

        {/* Pick Winner Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center mb-12"
        >
          <motion.button
            onClick={pickRandomWinner}
            disabled={isSpinning}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative font-display font-bold text-xl text-white bg-gradient-to-r from-fuchsia-500 to-purple-600 px-16 py-5 rounded-2xl shadow-lg overflow-hidden disabled:opacity-50"
            style={{
              boxShadow: '0 0 5px #d946ef, 0 0 10px #d946ef, 0 0 15px #a855f7',
            }}
          >
            <span className="relative z-10 flex items-center gap-3">
              <Trophy className="w-6 h-6" />
              {isSpinning ? 'Picking Winner...' : 'Pick Random Winner'}
            </span>
          </motion.button>
        </motion.div>

        {/* Winner Display */}
        {selectedWinner && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="mb-12 p-8 glass-morph-premium rounded-2xl max-w-2xl mx-auto"
          >
            <div className="text-center">
              <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">🎉 Winner Selected!</h2>
              <div className="mt-6 space-y-2">
                <p className="text-2xl font-bold text-cyan-400">{selectedWinner.name}</p>
                <p className="text-white/80">{selectedWinner.email}</p>
                <p className="text-white/80">{selectedWinner.phone}</p>
                <p className="text-white/80">📍 {selectedWinner.city}</p>
                <p className="text-purple-300">Total Entries: {selectedWinner.entries}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Data Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-morph-premium rounded-2xl p-6 overflow-x-auto"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left p-4 text-purple-300 font-bold">ID</th>
                <th className="text-left p-4 text-purple-300 font-bold">Name</th>
                <th className="text-left p-4 text-purple-300 font-bold">Email</th>
                <th className="text-left p-4 text-purple-300 font-bold">Phone</th>
                <th className="text-left p-4 text-purple-300 font-bold">City</th>
                <th className="text-left p-4 text-purple-300 font-bold">Entries</th>
              </tr>
            </thead>
            <tbody>
              {guideData.map((guide, index) => (
                <motion.tr
                  key={guide.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className={`border-b border-white/10 hover:bg-white/5 transition-colors ${
                    selectedWinner?.id === guide.id ? 'bg-yellow-500/20' : ''
                  }`}
                >
                  <td className="p-4 text-white">{guide.id}</td>
                  <td className="p-4 text-white font-medium">{guide.name}</td>
                  <td className="p-4 text-white/80">{guide.email}</td>
                  <td className="p-4 text-white/80">{guide.phone}</td>
                  <td className="p-4 text-white/80">{guide.city}</td>
                  <td className="p-4 text-cyan-400 font-bold">{guide.entries}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="glass-morph-premium p-6 rounded-xl text-center">
            <p className="text-purple-300 text-sm mb-2">Total Participants</p>
            <p className="text-4xl font-bold text-white">{guideData.length}</p>
          </div>
          <div className="glass-morph-premium p-6 rounded-xl text-center">
            <p className="text-purple-300 text-sm mb-2">Total Entries</p>
            <p className="text-4xl font-bold text-white">
              {guideData.reduce((sum, guide) => sum + guide.entries, 0)}
            </p>
          </div>
          <div className="glass-morph-premium p-6 rounded-xl text-center">
            <p className="text-purple-300 text-sm mb-2">Cities Covered</p>
            <p className="text-4xl font-bold text-white">
              {new Set(guideData.map(g => g.city)).size}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </div>
  );
}