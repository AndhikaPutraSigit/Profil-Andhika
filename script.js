// ==========================================
// DATA KEAHLIAN MAHASISWA
// ==========================================

const dataKeahlian = [
    {
        nama: "HTML",
        kategori: "Web",
        nilai: 85
    },
    {
        nama: "CSS",
        kategori: "Web",
        nilai: 80
    },
    {
        nama: "Bootstrap",
        kategori: "Web",
        nilai: 82
    },
    {
        nama: "JavaScript",
        kategori: "Programming",
        nilai: 75
    },
    {
        nama: "Python",
        kategori: "Programming",
        nilai: 78
    },
    {
        nama: "Microsoft Office",
        kategori: "Office",
        nilai: 88
    }
];


// ==========================================
// Menghitung rata-rata nilai keahlian
// ==========================================

function hitungRataRata(data) {
    let total = 0;

    for (const keahlian of data) {
        total += keahlian.nilai;
    }

    return total / data.length;
}


// ==========================================
// Mencari keahlian berdasarkan kategori
// ==========================================

function cariKategori(data, kategori) {
    return data.filter(function(keahlian) {
        return keahlian.kategori === kategori;
    });
}


// ==========================================
// Menentukan tingkat kemampuan
// ==========================================

function tentukanLevel(nilai) {

    if (nilai >= 85) {
        return "Sangat Baik";
    } else if (nilai >= 75 && nilai < 85) {
        return "Baik";
    } else {
        return "Perlu Latihan";
    }
}


// ==========================================
// MENAMPILKAN SEMUA DATA
// ==========================================

console.log("=== DATA KEAHLIAN MAHASISWA ===");

dataKeahlian.forEach(function(keahlian) {

    console.log(
        keahlian.nama +
        " | Kategori: " +
        keahlian.kategori +
        " | Nilai: " +
        keahlian.nilai +
        " | Level: " +
        tentukanLevel(keahlian.nilai)
    );

});


// ==========================================
// MENGHITUNG RATA-RATA
// ==========================================

const rataRata = hitungRataRata(dataKeahlian);

console.log("");
console.log("=== HASIL PERHITUNGAN ===");
console.log("Rata-rata nilai keahlian: " + rataRata.toFixed(2));


// ==========================================
// MENCARI KEAHLIAN KATEGORI WEB
// ==========================================

const keahlianWeb = cariKategori(dataKeahlian, "Web");

console.log("");
console.log("=== KEAHLIAN KATEGORI WEB ===");

for (const keahlian of keahlianWeb) {

    console.log(
        keahlian.nama +
        " - Nilai: " +
        keahlian.nilai
    );

}


// ==========================================
// FILTER KEAHLIAN DENGAN NILAI TINGGI
// Menggunakan operator perbandingan
// dan operator logika
// ==========================================

console.log("");
console.log("=== KEAHLIAN DENGAN NILAI >= 80 ===");

for (const keahlian of dataKeahlian) {

    if (
        keahlian.nilai >= 80 &&
        keahlian.kategori !== "Office"
    ) {

        console.log(
            keahlian.nama +
            " - Nilai: " +
            keahlian.nilai
        );

    }

}