interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <article className="group bg-white border border-gray-soft rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-t-2 border-t-teal flex flex-col gap-4">
      <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center text-teal">
        {icon}
      </div>
      <h3 className="font-serif text-lg font-semibold text-navy">{title}</h3>
      <p className="text-sm text-gray-muted leading-relaxed">{description}</p>
    </article>
  );
}
