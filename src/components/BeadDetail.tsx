import { X, Gem } from 'lucide-react';
import type { CrystalBead, Accessory } from '@/types';
import { useStudioStore } from '@/store/studioStore';
import ImageUpload from './ImageUpload';

const shapeLabels: Record<string, string> = {
  round: '圆形',
  oval: '椭圆形',
  square: '方形',
  heart: '心形',
};

const typeLabels: Record<string, string> = {
  spacer: '隔珠',
  pendant: '吊坠',
  charm: '挂饰',
  clasp: '扣头',
};

interface BeadProps {
  bead: CrystalBead;
  onClose: () => void;
  onAdd: (bead: CrystalBead) => void;
  accessory?: never;
}

interface AccessoryProps {
  bead?: never;
  accessory: Accessory;
  onClose: () => void;
  onAdd: () => void;
}

type Props = BeadProps | AccessoryProps;

export default function BeadDetail(props: Props) {
  const { onClose } = props;
  const updateBeadImage = useStudioStore((s) => s.updateBeadImage);
  const updateAccessoryImage = useStudioStore((s) => s.updateAccessoryImage);

  const handleImageUpload = (dataUrl: string) => {
    if (props.bead) {
      updateBeadImage(props.bead.id, dataUrl);
    } else if (props.accessory) {
      updateAccessoryImage(props.accessory.id, dataUrl);
    }
  };

  const imageUrl = props.bead?.imageDataUrl || props.accessory?.imageDataUrl;
  const colorHex = props.bead?.colorHex || props.accessory?.colorHex || '#888';
  const name = props.bead?.name || props.accessory?.name || '';
  const category = props.bead
    ? `${props.bead.category} · ${shapeLabels[props.bead.shape]} · ${props.bead.size}mm`
    : `${props.accessory?.category} · ${typeLabels[props.accessory?.type || 'charm']}`;
  const meaning = props.bead?.meaning || props.accessory?.meaning || '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-[#1e0e38] border border-[#d4a843]/20 rounded-2xl p-6 w-[340px] max-w-[90vw] shadow-2xl animate-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full overflow-hidden"
              style={{
                backgroundColor: imageUrl ? 'transparent' : colorHex,
                boxShadow: imageUrl
                  ? 'none'
                  : `0 0 20px ${colorHex}60, inset 0 3px 4px rgba(255,255,255,0.3), inset 0 -3px 4px rgba(0,0,0,0.2)`,
                border: '2px solid rgba(255,255,255,0.2)',
              }}
            >
              {imageUrl ? (
                <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
              ) : null}
            </div>
            <div>
              <h3 className="text-[#f8f0e3] font-semibold text-lg">{name}</h3>
              <p className="text-[#f8f0e3]/50 text-sm">{category}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#f8f0e3]/40 hover:text-[#f8f0e3] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-[#d4a843]/5 rounded-xl p-4 mb-5 border border-[#d4a843]/10">
          <div className="flex items-center gap-2 mb-2">
            <Gem className="w-4 h-4 text-[#d4a843]" />
            <span className="text-xs text-[#d4a843] font-medium">寓意</span>
          </div>
          <p className="text-[#f8f0e3]/70 text-sm leading-relaxed">{meaning}</p>
        </div>

        {/* 图片上传 */}
        <div className="mb-4">
          <p className="text-xs text-[#f8f0e3]/40 mb-2">自定义图片</p>
          <ImageUpload onUpload={handleImageUpload} currentImage={imageUrl} />
        </div>

        <button
          onClick={() => {
            if (props.bead) {
              props.onAdd(props.bead);
            } else {
              props.onAdd(props.bead);
            }
          }}
          className="w-full py-3 bg-gradient-to-r from-[#d4a843] to-[#b8860b] text-[#1a0a2e] font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(212,168,67,0.3)] transition-all duration-300"
        >
          添加到手链
        </button>
      </div>
    </div>
  );
}