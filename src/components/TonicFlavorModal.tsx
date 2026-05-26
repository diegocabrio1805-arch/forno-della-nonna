import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { PizzaItem } from './PizzaCard';

interface TonicFlavorModalProps {
  isOpen: boolean;
  onClose: () => void;
  beverage: PizzaItem | null;
  onConfirm: (beverage: PizzaItem) => void;
}

export function TonicFlavorModal({ isOpen, onClose, beverage, onConfirm }: TonicFlavorModalProps) {
  const [selectedType, setSelectedType] = useState<'rosada' | 'clasica'>('rosada');

  useEffect(() => {
    if (isOpen) {
      setSelectedType('rosada');
    }
  }, [isOpen, beverage]);

  if (!isOpen || !beverage) return null;

  // Determine images based on variant size
  let rosadaImage = 'tonica_delacosta.png';
  let clasicaImage = 'tonica_delacosta_original.png';
  let rosadaId = 'tonica_delacosta_2l';
  let clasicaId = 'tonica_original_2l';
  let sizeLabel = '2 Litros';

  if (beverage.id.includes('pequena')) {
    rosadaImage = 'tonica_delacosta_pequena.png';
    clasicaImage = 'tonica_delacosta_original_pequena.png';
    rosadaId = 'tonica_delacosta_pequena';
    clasicaId = 'tonica_original_pequena';
    sizeLabel = 'Pequeña';
  } else if (beverage.id.includes('lata')) {
    rosadaImage = 'tonica_delacosta_lata.png';
    clasicaImage = 'tonica_delacosta_original_lata.png';
    rosadaId = 'tonica_delacosta_lata';
    clasicaId = 'tonica_original_lata';
    sizeLabel = 'Lata';
  } else {
    rosadaImage = 'tonica_delacosta_2l.png';
    clasicaImage = 'tonica_delacosta_original_2l.png';
    rosadaId = 'tonica_delacosta_2l';
    clasicaId = 'tonica_original_2l';
  }

  const activeImage = selectedType === 'rosada' ? rosadaImage : clasicaImage;
  const activeLabel = selectedType === 'rosada' ? 'Rosada (Grapefruit)' : 'Clásica (Original)';

  const handleConfirm = () => {
    const updatedBeverage = {
      ...beverage,
      id: selectedType === 'rosada' ? rosadaId : clasicaId,
      name: `Tónica De la Costa ${sizeLabel} (${activeLabel})`,
      image: activeImage
    };
    onConfirm(updatedBeverage);
    onClose();
  };

  return (
    <div 
      onClick={onClose} 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        backgroundColor: 'rgba(0,0,0,0.8)', 
        zIndex: 200, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <div 
        className="modal-content" 
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '450px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          background: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(255, 94, 0, 0.15)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(26, 29, 36, 0.95)' }}>
          <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'white' }}>Seleccionar Variedad</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flexGrow: 1, background: 'rgba(10, 11, 13, 0.85)' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)', transition: 'all 0.3s ease' }}>
             <img src={activeImage} alt={beverage.name} style={{ width: '100px', height: '100px', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', transition: 'all 0.3s ease', background: 'rgba(255,255,255,0.02)', padding: '0.25rem' }} />
             <div>
               <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', color: 'white' }}>Tónica De la Costa</h3>
               <p style={{ margin: 0, color: 'var(--text-muted)' }}>Tamaño: <strong style={{ color: 'white' }}>{sizeLabel}</strong></p>
               <p style={{ margin: '0.25rem 0 0 0', color: 'var(--primary)', fontWeight: 700, fontSize: '1.15rem' }}>{beverage.price.toLocaleString('es-PY')} Gs.</p>
               <p style={{ margin: '0.5rem 0 0 0', color: 'white', fontWeight: 600 }}>{activeLabel}</p>
             </div>
          </div>

          <h3 style={{ fontSize: '1.125rem', marginBottom: '0.75rem', color: 'white' }}>Elija la tónica:</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
            
            {/* Opción Rosada */}
            <label 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                background: selectedType === 'rosada' ? 'rgba(255, 94, 0, 0.1)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${selectedType === 'rosada' ? 'var(--primary)' : 'rgba(255,255,255,0.05)'}`,
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={() => setSelectedType('rosada')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: `2px solid ${selectedType === 'rosada' ? 'var(--primary)' : 'rgba(255,255,255,0.2)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  transition: 'all 0.2s ease'
                }}>
                  {selectedType === 'rosada' && <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)' }} />}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img src={rosadaImage} alt="Tónica Rosada" style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '5px', background: 'rgba(255,255,255,0.02)' }} />
                  <div>
                    <span style={{ color: 'white', fontWeight: selectedType === 'rosada' ? 600 : 400, display: 'block' }}>Rosada (Grapefruit)</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Sin Azúcar</span>
                  </div>
                </div>
              </div>
            </label>

            {/* Opción Clásica */}
            <label 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                background: selectedType === 'clasica' ? 'rgba(255, 94, 0, 0.1)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${selectedType === 'clasica' ? 'var(--primary)' : 'rgba(255,255,255,0.05)'}`,
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onClick={() => setSelectedType('clasica')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: `2px solid ${selectedType === 'clasica' ? 'var(--primary)' : 'rgba(255,255,255,0.2)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  transition: 'all 0.2s ease'
                }}>
                  {selectedType === 'clasica' && <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)' }} />}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img src={clasicaImage} alt="Tónica Clásica" style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '5px', background: 'rgba(255,255,255,0.02)' }} />
                  <div>
                    <span style={{ color: 'white', fontWeight: selectedType === 'clasica' ? 600 : 400, display: 'block' }}>Clásica (Original)</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Sin Azúcar</span>
                  </div>
                </div>
              </div>
            </label>

          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255, 94, 0, 0.2)', background: 'rgba(26, 29, 36, 0.95)' }}>
          <button 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem', fontSize: '1.125rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            onClick={handleConfirm}
          >
            Confirmar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}
