'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-gradient-to-br from-yellow-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Découvrez <span style={{ color: '#e8b900' }}>DigitalProLearning</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
            Nous créons des expériences web mémorables, alliant design moderne, performance et accessibilité pour tous.
          </p>
          <a
            href="#values"
            className="inline-block px-8 py-4 font-semibold rounded-full text-white"
            style={{ backgroundColor: '#e8b900', transition: '0.3s' }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#d3a800'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#e8b900'}
          >
            En savoir plus
          </a>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Notre Histoire</h2>
              <p className="text-gray-600 mb-4">
                DigitalProLearning est né d'une idée simple : rendre le web accessible et professionnel pour tous. 
                Nous croyons que chaque organisation mérite une présence en ligne forte, sans compromis sur la qualité.
              </p>
              <p className="text-gray-600 mb-4">
                De l'église locale à la startup innovante, nous accompagnons nos clients avec passion et expertise, 
                en proposant des sites rapides, beaux et fonctionnels.
              </p>
              <p className="text-gray-600">
                Notre approche combine créativité, technologie et écoute attentive pour transformer vos idées en expériences digitales inoubliables.
              </p>
            </div>
            <div className="relative">
              <img
                src="Marque.png"
                alt="Notre histoire"
                className="rounded-xl shadow-2xl w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="values" className="py-20 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Valeurs</h2>
            <p className="text-lg text-gray-700">Ce qui nous anime et guide chacun de nos projets</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-yellow-200">
                <i className="ri-heart-line text-3xl" style={{ color: '#e8b900' }}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Passion</h3>
              <p className="text-gray-600">
                Chaque projet est pour nous une aventure créative. Nous y mettons notre cœur et notre savoir-faire.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-yellow-200">
                <i className="ri-shield-check-line text-3xl" style={{ color: '#e8b900' }}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Qualité</h3>
              <p className="text-gray-600">
                Nous ne transigeons jamais sur la qualité. Chaque site est performant, sécurisé et moderne.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-yellow-200">
                <i className="ri-team-line text-3xl" style={{ color: '#e8b900' }}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Proximité</h3>
              <p className="text-gray-600">
                Chaque client est unique. Nous construisons des relations basées sur l'écoute, la confiance et l'accompagnement.
              </p>
            </div>
          </div>
        </div>
      </section>

    {/* Team Section */}
<section className="py-20 bg-white">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Notre Équipe</h2>
      <p className="text-base text-gray-700">Des experts passionnés à votre service</p>
    </div>

    <div className="flex flex-col md:flex-row gap-16">
      {/* Personne 1 */}
      <div className="flex-1 flex flex-col items-center">
        <img
  src="/photo-kone.png"
  alt="Koné Gniennegninri Bienvenu"
  className="rounded-xl shadow-2xl w-64 object-cover mb-8"
/>

        <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Koné Gniennegninri Bienvenu</h3>
        <p className="text-yellow-600 font-semibold mb-6 text-center">Fondateur & Directeur Technique</p>
        <div className="text-gray-600 mb-6 text-base leading-relaxed text-justify">
          <p className="mb-6">
            Koné Gniennegninri Bienvenu est un développeur web confirmé et fondateur de <strong>DigitalProLearning</strong>, une plateforme innovante de création et location de sites internet. Son approche combine expertise technique et vision stratégique.
          </p>
          <p className="mb-6">
            Il est titulaire d’un <strong>Brevet de Technicien Supérieur (BTS) en informatique, développement d’applications</strong>, a ensuite effectué une <strong>L2 en sciences numériques (SN) à l’Université Virtuelle de Côte d’Ivoire (UVCI)</strong>, et poursuit actuellement un <strong>B.Tech en IT en Inde</strong>. Cette formation lui permet de rester à la pointe des technologies.
          </p>
          <p className="mb-6">
            Fort d’une expérience d’un an comme <strong>analyste SOC chez Talentys Supply Chain</strong>, Koné transforme les idées en solutions digitales performantes, offrant des produits fiables et innovants adaptés aux besoins de ses clients.
          </p>
        </div>
      </div>

      {/* Personne 2 */}
      <div className="flex-1 flex flex-col items-center">
        <img
          src="https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20confident%20female%20UX%20designer&width=400&height=400"
          alt="Sophie Dubois"
          className="rounded-xl shadow-2xl w-64 object-cover mb-8"
        />
        <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Sophie Dubois</h3>
        <p className="text-yellow-600 font-semibold mb-6 text-center">Designer UX/UI</p>
        <div className="text-gray-600 mb-6 text-base leading-relaxed text-justify">
          <p className="mb-6">
            Sophie crée des expériences utilisateur mémorables et des interfaces élégantes et intuitives. Sa créativité alliée à l’ergonomie permet de concevoir des produits digitaux attractifs et fonctionnels.
          </p>
          <p className="mb-6">
            Elle accompagne chaque projet pour garantir une expérience visuelle cohérente et performante, en mettant l’utilisateur au centre de ses choix de design.
          </p>
          <p className="mb-6">
            Grâce à son sens du détail et sa passion pour le design, Sophie contribue à transformer chaque idée en une interface simple, agréable et efficace.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>



      {/* Stats Section */}
      <section className="py-20" style={{ backgroundColor: '#e8b900' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 text-center text-white">
            <div>
              <div className="text-5xl font-extrabold mb-2">150+</div>
              <div className="text-yellow-100 font-medium">Sites créés</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-2">200+</div>
              <div className="text-yellow-100 font-medium">Clients satisfaits</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-2">15</div>
              <div className="text-yellow-100 font-medium">Années d'expérience</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-2">50+</div>
              <div className="text-yellow-100 font-medium">Projets en cours</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ils nous ont fait confiance</h2>
            <p className="text-lg text-gray-700">Voici ce que nos clients disent de nous</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
              <p className="text-gray-600 mb-4">
                « Une équipe exceptionnelle, très professionnelle et toujours à l'écoute. Mon site est parfait ! »
              </p>
              <div className="flex items-center">
                <img
                  src="https://readdy.ai/api/search-image?query=Happy%20female%20client&width=50&height=50"
                  alt="Lucie Bernard"
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">Lucie Bernard</h3>
                  <p className="text-yellow-600 font-medium">Fondatrice, ArtGallery</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
              <p className="text-gray-600 mb-4">
                « Grâce à eux, notre startup a un site moderne et efficace qui attire de vrais clients. »
              </p>
              <div className="flex items-center">
                <img
                  src="https://readdy.ai/api/search-image?query=Happy%20male%20client&width=50&height=50"
                  alt="Marc Dupont"
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">Marc Dupont</h3>
                  <p className="text-yellow-600 font-medium">CEO, TechStart</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
              <p className="text-gray-600 mb-4">
                « L'équipe est réactive et créative, et le résultat final dépasse nos attentes. »
              </p>
              <div className="flex items-center">
                <img
                  src="https://readdy.ai/api/search-image?query=Happy%20female%20client&width=50&height=50"
                  alt="Claire Fontaine"
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">Claire Fontaine</h3>
                  <p className="text-yellow-600 font-medium">Responsable Marketing, Foodies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Technologies</h2>
      <p className="text-lg text-gray-700">Nous maîtrisons un large éventail de technologies pour créer vos projets web</p>
    </div>

    <div className="flex flex-wrap justify-center gap-6">
      {[
        'HTML', 'CSS', 'JavaScript', 'React', 'Next.js',
        'PHP', 'Laravel', 'Tailwind', 'Node.js', 'MySQL',
        'GraphQL', 'TypeScript', 'Vue.js', 'Figma'
      ].map((tech, index) => (
        <div
          key={index}
          className="px-6 py-3 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 text-gray-800 font-semibold"
        >
          {tech}
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Call to Action Section */}
      <section className="py-20 bg-yellow-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Prêt à commander votre site ?</h2>
          <p className="text-lg text-gray-700 mb-8">Rejoignez nos clients satisfaits et démarrez votre projet dès aujourd'hui.</p>
          <a
            href="order"
            className="inline-block px-8 py-4 font-semibold rounded-full text-white"
            style={{ backgroundColor: '#e8b900', transition: '0.3s' }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#d3a800'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#e8b900'}
          >
            Commander maintenant
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
