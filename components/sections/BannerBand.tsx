import Image from "next/image";

export default function BannerBand() {
  return (
    <section className="banner-band">
      <div className="container">
        <Image
          src="/assets/banner.jpeg"
          alt="NSJ Multiservice — entretien, nettoyage extrême, débarras, rénovation, serrurerie, transport, bricolage, espaces verts, dératisation"
          width={2048}
          height={683}
          sizes="(max-width: 1180px) 100vw, 1180px"
        />
      </div>
    </section>
  );
}
