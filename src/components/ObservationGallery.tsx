import { useState } from 'react';
import { GALLERY } from '../data';
import { GalleryItem } from '../types';
import { soundEngine } from '../audio';
import { Search, Compass, Eye, X, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ObservationGallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<'All' | GalleryItem['category']>('All');

  const handleCardClick = (item: GalleryItem) => {
    soundEngine.playSweep('up');
    setSelectedItem(item);
  };

  const handleClose = () => {
    soundEngine.playPulse(380, 0.1, 'sine');
    setSelectedItem(null);
  };

  const categories: ('All' | GalleryItem['category'])[] = ['All', 'Nebula', 'Galaxy', 'DeepSpace', 'Phenomenon'];

  const filteredItems = filter === 'All' 
    ? GALLERY 
    : GALLERY.filter(item => item.category === filter);

  return (
    <div className="space-y-6">
      {/* Editorial Filter Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4">
        <div className="text-[10px] tracking-[0.4em] uppercase text-gray-400/85 font-mono flex items-center gap-2">
          <Compass className="w-4 h-4 text-blue-400" />
          <span>Focal Observation Catalog</span>
        </div>
        
        {/* Category filters */}
        <div className="flex flex-wrap gap-1.5 bg-black/40 p-1 rounded-md border border-white/5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                soundEngine.playPulse(520, 0.08, 'sine');
                setFilter(cat);
              }}
              className={`px-3 py-1 text-[9px] uppercase tracking-wider font-mono transition-all rounded ${
                filter === cat
                  ? 'bg-white/10 text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Layout of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => handleCardClick(item)}
              className="group cursor-pointer bg-white/5 border border-white/5 hover:border-white/15 rounded-lg overflow-hidden transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Frame with crop details */}
              <div className="relative aspect-video overflow-hidden bg-black/30">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                
                {/* Visual hover indicators */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[1px]">
                  <span className="px-5 py-2 border border-white/30 text-[9px] uppercase tracking-widest text-white font-mono flex items-center gap-1.5 rounded-sm bg-black/30">
                    <Eye className="w-3.5 h-3.5" /> HighMagnification
                  </span>
                </div>

                <span className="absolute bottom-2 left-3 text-[8px] font-mono uppercase px-1.5 py-0.5 rounded bg-black/60 text-blue-300 border border-white/5">
                  {item.category}
                </span>
              </div>

              {/* Informative index text in footer */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-sans font-medium tracking-wide text-white group-hover:text-blue-300 transition-all">
                    {item.title}
                  </h3>
                  <p className="text-[10px] font-mono text-gray-500 mt-1 uppercase">
                    Instr: {item.instrument}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-3 grid grid-cols-2 text-[9px] font-mono text-gray-500">
                  <div>
                    <span className="block text-[8px] uppercase font-sans text-gray-600">COORDINATE</span>
                    <span className="text-gray-400">{item.coordinates.ra.split(' ')[0]} {item.coordinates.ra.split(' ')[1]}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[8px] uppercase font-sans text-gray-600">SPECTRAL RANGE</span>
                    <span className="text-gray-400 truncate block">{item.spectralRange.split(' ')[0]}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Magnification Detail Dialog Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="relative w-full max-w-4xl bg-[#07070f] border border-white/10 rounded-xl overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.85)] z-10 grid grid-cols-1 md:grid-cols-12"
            >
              {/* Image side (Col-span 7) */}
              <div className="md:col-span-7 relative h-64 md:h-auto bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                
                {/* Tech grid overlays mimicking scientific crop scopes */}
                <div className="absolute inset-4 border border-white/10 pointer-events-none flex flex-col justify-between p-2">
                  <div className="flex justify-between text-[7px] font-mono text-white/30">
                    <span>GRID REF: L-900</span>
                    <span>HD FIELD FOCUS</span>
                  </div>
                  <div className="flex justify-between text-[7px] font-mono text-white/30">
                    <span>SPECTRAL LAYER 04</span>
                    <span>AETERNA DEEP VIEW</span>
                  </div>
                </div>
              </div>

              {/* Data catalog details side (Col-span 5) */}
              <div className="md:col-span-5 p-6 flex flex-col justify-between gap-6 overflow-y-auto max-h-[80vh] md:max-h-none">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[8px] font-mono uppercase bg-blue-500/10 text-blue-300 border border-blue-500/20 px-2 py-0.5 rounded">
                        {selectedItem.category}
                      </span>
                      <h2 className="text-xl font-serif italic text-white mt-1.5 leading-tight">
                        {selectedItem.title}
                      </h2>
                    </div>
                    <button
                      onClick={handleClose}
                      className="p-1 px-2 border border-white/10 hover:border-white/20 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs leading-relaxed text-gray-400 font-light pt-2">
                    {selectedItem.description}
                  </p>
                </div>

                {/* Technical data block */}
                <div className="space-y-3.5 border-t border-white/10 pt-4">
                  <div className="text-[9px] font-mono uppercase text-gray-500 tracking-wider">
                    SPECIFICATION REGISTER
                  </div>
                  
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-[10px] font-mono">
                    <div>
                      <span className="text-gray-500 block">OBSERVATION DATE</span>
                      <span className="text-gray-300">{selectedItem.dateCaptured}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">SPECTRAL RANGE</span>
                      <span className="text-gray-300 truncate block">{selectedItem.spectralRange}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">INSTRUMENTATION</span>
                      <span className="text-gray-300">{selectedItem.instrument}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">ASCENSION / RA</span>
                      <span className="text-gray-300">{selectedItem.coordinates.ra}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">DECLINATION / DEC</span>
                      <span className="text-gray-300">{selectedItem.coordinates.dec}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">OPTICAL RATIO</span>
                      <span className="text-gray-300">f / 1.25 ARC</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/5 p-3.5 rounded text-[10px] text-gray-500 leading-normal italic font-light pt-2 text-center border-dashed">
                  Sub-space telescope optical fields aligned perfectly with Kepler focal centers.
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
