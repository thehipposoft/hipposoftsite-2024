'use client'
import Image from 'next/image';
import Link from 'next/link';

type TeamCardProps = {
    name: string;
    role: string;
    photoSrc: string;
    email: string;
    whatsapp: string;
};

const handleSaveContact = async ({name, role, email, whatsapp}: Omit<TeamCardProps, 'photoSrc'>) => {
  const vCardText = buildVCardText({ name, role, email, whatsapp });
  const file = new File([vCardText], `${name.replace(/\s+/g, '-')}.vcf`, {
    type: 'text/vcard',
  });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: name,
      });
      return;
    } catch (err) {
      // usuario canceló el share, o falló -> caemos al fallback
    }
  }

  // Fallback: descarga normal (desktop, o navegadores sin soporte)
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = file.name;
  link.click();
  URL.revokeObjectURL(url);
};

const buildVCardText = ({ name, role, email, whatsapp }: Omit<TeamCardProps, 'photoSrc'>) => {
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${name}`,
    `TITLE:${role}`,
    'ORG:HippoSoft',
    `EMAIL;TYPE=INTERNET:${email}`,
    `TEL;TYPE=CELL:${whatsapp}`,
    'URL:https://www.thehipposoft.com',
    'END:VCARD',
  ].join('\r\n'); // \r\n es más correcto según el spec vCard
};

const buildVCard = ({ name, role, email, whatsapp }: Omit<TeamCardProps, 'photoSrc'>) => {
    const vCard = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${name}`,
        `TITLE:${role}`,
        'ORG:HippoSoft',
        `EMAIL;TYPE=INTERNET:${email}`,
        `TEL;TYPE=CELL:${whatsapp}`,
        'URL:https://www.thehipposoft.com',
        'END:VCARD',
    ].join('\n');

    return `data:text/vcard;charset=utf-8,${encodeURIComponent(vCard)}`;
};

const TeamCard = ({ name, role, photoSrc, email, whatsapp }: TeamCardProps) => {
    const whatsappNumber = whatsapp.replace(/[^\d]/g, '');

    return (
        <main className='relative min-h-screen bg-[#221b35] flex items-center justify-center px-6 py-16'>
            <div className='w-full max-w-sm flex flex-col items-center gap-8 text-center'>
                <div className='overflow-hidden'>
                    <Image src={'/assets/logo.png'} alt='HippoSoft logo' width={1144} height={451} className='w-40' />
                </div>

                <div className='relative w-40 h-40 rounded-full overflow-hidden ring-4 ring-[#70FFE5]/40'>
                    <Image src={photoSrc} alt={name} fill className='object-cover' />
                </div>

                <div className='flex flex-col gap-1'>
                    <h1 className='text-3xl text-white'>{name}</h1>
                    <p className='text-lg text-[#70FFE5] text-sora'>{role}</p>
                </div>

                <div className='flex flex-col gap-4 w-full mt-4'>
                    <Link
                        href={`mailto:${email}`}
                        className='flex items-center justify-center gap-3 w-full rounded-full border border-white/20 py-3 px-6 text-white hover:bg-white/10 transition-colors'
                    >
                        <svg width="25" height="15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.075 2.333A3 3 0 0 1 3 0h18a3 3 0 0 1 2.925 2.333L12 9.62.075 2.332ZM0 4.045v10.656l8.704-5.337L0 4.045Zm10.142 6.2-9.855 6.04A3 3 0 0 0 3 18h18a3 3 0 0 0 2.712-1.716l-9.855-6.04L12 11.378l-1.858-1.136v.002Zm5.154-.879L24 14.701V4.046l-8.704 5.318v.002Z" fill="#70FFE5"/></svg>
                        <span>{email}</span>
                    </Link>

                    <Link
                        href={`https://wa.me/${whatsappNumber}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='flex items-center justify-center gap-3 w-full rounded-full bg-[#70FFE5] py-3 px-6 text-[#221b35] font-medium hover:opacity-90 transition-opacity'
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4 8.05 8.05 0 0 0 4 12.05a7.98 7.98 0 0 0 1.07 4.02L4 20l4.05-1.06a8 8 0 0 0 3.99 1.02h.01a8.05 8.05 0 0 0 8.05-8.05 7.85 7.85 0 0 0-2.5-5.6Zm-5.55 12.4h-.01a6.7 6.7 0 0 1-3.4-.93l-.24-.14-2.4.63.64-2.34-.16-.24a6.62 6.62 0 0 1-1.02-3.55 6.7 6.7 0 0 1 6.7-6.7 6.65 6.65 0 0 1 4.73 1.96 6.63 6.63 0 0 1 1.96 4.72 6.7 6.7 0 0 1-6.8 6.59Zm3.67-5.02c-.2-.1-1.18-.58-1.36-.65-.18-.07-.32-.1-.45.1-.13.2-.51.65-.63.78-.12.13-.23.15-.43.05a5.44 5.44 0 0 1-1.6-.99 6.01 6.01 0 0 1-1.1-1.37c-.12-.2 0-.31.09-.4.1-.1.2-.24.3-.36.1-.12.14-.2.2-.34.07-.13.04-.25-.01-.35-.05-.1-.45-1.09-.62-1.49-.16-.39-.33-.34-.45-.34h-.39c-.13 0-.34.05-.52.24-.18.2-.68.67-.68 1.63s.7 1.9.8 2.03c.1.13 1.38 2.11 3.35 2.96.47.2.83.32 1.12.41.47.15.9.13 1.24.08.38-.06 1.18-.48 1.34-.95.17-.46.17-.86.12-.95-.05-.09-.18-.15-.38-.25Z" fill="#221b35"/></svg>
                        <span>WhatsApp</span>
                    </Link>

                    <button
                        type='button'
                        onClick={() => handleSaveContact({ name, role, email, whatsapp })}
                        className='flex items-center justify-center gap-3 w-full rounded-full border border-white/20 py-3 px-6 text-white hover:bg-white/10 transition-colors'
                    >
                        Guardar contacto
                    </button>
                </div>
            </div>
        </main>
    );
};

export default TeamCard;
