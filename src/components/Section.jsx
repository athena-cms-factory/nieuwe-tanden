import React, { useEffect } from 'react';
import EditableMedia from './EditableMedia';
import EditableText from './EditableText';

const Section = ({ data }) => {
  const sectionOrder = data.section_order || [];

  useEffect(() => {
    if (window.athenaScan) {
      window.athenaScan(data);
    }
  }, [data, sectionOrder]);

  return (
    <div className="flex flex-col">
      {sectionOrder.map((sectionName, idx) => {
        const items = data[sectionName] || [];
        if (items.length === 0) return null;

        if (sectionName === 'basisgegevens') {
          const hero = items[0];
          return (
            <section key={idx} data-dock-section="basisgegevens" className="relative h-[80vh] flex items-center justify-center overflow-hidden">              <div className="absolute inset-0 z-0">                <EditableMedia src={hero.hero_afbeelding || hero.foto_url} cmsBind={{file: 'basisgegevens', index: 0, key: hero.hero_afbeelding ? 'hero_afbeelding' : 'foto_url'}} className="w-full h-full object-cover" />                <div className="absolute inset-0 bg-black/40"></div>              </div>              <div className="relative z-10 text-center px-6 max-w-4xl">                <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8">                  <EditableText value={hero.hero_header || hero.site_naam} cmsBind={{file: 'basisgegevens', index: 0, key: hero.hero_header ? 'hero_header' : 'site_naam'}} />                </h1>                <div className="h-1.5 w-24 bg-accent mx-auto mb-8"></div>              </div>            </section>          );
        }

        if (sectionName.includes('product')) {
          return (
            <section key={idx} data-dock-section={sectionName} className="py-20 px-6 bg-background">
              <div className="max-w-7xl mx-auto text-center">
                <div className="flex flex-wrap justify-center items-stretch gap-12">
                  {items.map((item, index) => {
                    const priceValue = parseFloat(String(item.prijs || 0).replace(/[^0-9.,]/g, '').replace(',', '.'));
                    const titleKey = Object.keys(item).find(k => /naam|titel/i.test(k)) || 'naam';
                    const imgKey = Object.keys(item).find(k => /foto|afbeelding|url/i.test(k)) || 'product_foto_url';
                    return (
                      <article key={index} className="w-full md:w-[calc(45%)] lg:w-[calc(30%)] min-w-[300px] flex flex-col bg-surface p-6 rounded-[2rem] shadow-lg transition-transform hover:scale-[1.02]">
                        <div className="aspect-square rounded-xl overflow-hidden mb-6 flex-shrink-0">
                          <EditableMedia src={item[imgKey]} cmsBind={{file: sectionName, index, key: imgKey}} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col flex-grow">
                          <h3 className="text-xl font-bold mb-2 min-h-[3.5rem] flex items-center justify-center">
                            <EditableText value={item[titleKey]} cmsBind={{file: sectionName, index, key: titleKey}} />
                          </h3>
                          <div className="text-accent font-bold mt-auto text-2xl mb-4">€{priceValue.toFixed(2)}</div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        }

        return (
          <section key={idx} data-dock-section={sectionName} className={'py-20 px-6 ' + (idx % 2 === 1 ? 'bg-black/5' : '')}>
              <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-12">{sectionName.replace(/_/g, ' ')}</h2>
                <div className="flex flex-wrap justify-center gap-8">
                  {items.map((item, index) => {
                   const titleKey = Object.keys(item).find(k => /naam|titel|header/i.test(k)) || Object.keys(item)[0];
                   return (
                     <div key={index} className="bg-surface p-6 rounded-xl shadow-sm">
                       <EditableText value={item[titleKey]} cmsBind={{file: sectionName, index, key: titleKey}} />
                     </div>
                   );
                })}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Section;
