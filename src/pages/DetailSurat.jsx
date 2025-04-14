import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import AudioPlayer from "../components/AudioPlayer";

const DetailSurat = () => {
  const { id } = useParams(); // Ambil parameter dari URL
  const [surat, setSurat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAudio, setCurrentAudio] = useState(null);

  const getDetailSurat = (idSurat) => {
    fetch(`https://equran.id/api/v2/surat/${idSurat}`)
      .then((res) => res.json())
      .then((data) => {
        setSurat(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getDetailSurat(id);
  }, [id]); 

  if (loading) return <p>Loading...</p>;
  if (!surat) return <p>Surat tidak ditemukan.</p>;

  return (
    <>
      <div className="vh-100 overflow-auto">
        <h2>
          {surat.namaLatin} ({surat.nama})
        </h2>
        <p>Jumlah Ayat: {surat.jumlahAyat}</p>
        <p>Arti: {surat.arti}</p>
        <p>Deskripsi: {parse(surat.deskripsi)}</p>
        <div>
        <div className="my-3 p-3 border rounded">
  <h5>Audio Full Surah</h5>
  <AudioPlayer
    key={surat.nomor} 
    url={surat.audioFull["05"]}
    currentAudio={currentAudio}
    setCurrentAudio={setCurrentAudio}
  />
</div>
          <ul className="list-group">
          {surat.ayat.map((ayat) => (
  <li key={ayat.nomorAyat} className="list-group-item">
    <div className="d-flex justify-content-between mb-2">
      <span className="align-items-center arabic-text">
        {ayat.teksArab}
      </span>
      <div className="d-flex align-items-center">
        <span className="badge text-bg-primary rounded-sm d-flex align-items-center p-2 me-1">
          {ayat.nomorAyat}
        </span>
        <span>
          <AudioPlayer
            key={ayat.nomorAyat}
            url={ayat.audio["05"]}
            currentAudio={currentAudio}
            setCurrentAudio={setCurrentAudio}
          />
        </span>
      </div>
    </div>
    <div className="mt-1 teks-indonesia" style={{ fontStyle: "italic" }}>
      {ayat.teksIndonesia}
    </div>
  </li>
))}

          </ul>
        </div>
      </div>
    </>
  );
};

export default DetailSurat;
