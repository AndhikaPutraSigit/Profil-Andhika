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


// ==========================================
// DOM
// ==========================================

const tabelKeahlian = document.getElementById("tabelKeahlian");


// ==========================================
// MENAMPILKAN DATA KE TABEL
// ==========================================

function tampilkanData(data) {

    tabelKeahlian.innerHTML = "";

    for (const keahlian of data) {

        const baris = document.createElement("tr");

        const kolomNama = document.createElement("td");
        kolomNama.textContent = keahlian.nama;

        const kolomKategori = document.createElement("td");
        kolomKategori.textContent = keahlian.kategori;

        const kolomNilai = document.createElement("td");
        kolomNilai.textContent = keahlian.nilai;

        const kolomLevel = document.createElement("td");
        kolomLevel.textContent = tentukanLevel(keahlian.nilai);

        baris.appendChild(kolomNama);
        baris.appendChild(kolomKategori);
        baris.appendChild(kolomNilai);
        baris.appendChild(kolomLevel);

        tabelKeahlian.appendChild(baris);

    }

}


// Tampilkan data saat halaman pertama dibuka
tampilkanData(dataKeahlian);


// ==========================================
// PENCARIAN
// ==========================================

const formCari = document.getElementById("formCari");

const inputCari = document.getElementById("inputCari");

const hasilPencarian = document.getElementById("hasilPencarian");


formCari.addEventListener("submit", function(event) {

    event.preventDefault();

    const kataKunci = inputCari.value.trim().toLowerCase();


    if (kataKunci === "") {

        hasilPencarian.textContent =
            "Silakan masukkan nama keahlian.";

        hasilPencarian.classList.remove("pesan-sukses");

        hasilPencarian.classList.add("pesan-error");

        tampilkanData(dataKeahlian);

        return;

    }


    const hasil = dataKeahlian.filter(function(keahlian) {

        return keahlian.nama
            .toLowerCase()
            .includes(kataKunci);

    });


    tampilkanData(hasil);


    if (hasil.length > 0) {

        hasilPencarian.textContent =
            "Ditemukan " + hasil.length +
            " data keahlian.";

        hasilPencarian.classList.remove("pesan-error");

        hasilPencarian.classList.add("pesan-sukses");

    } else {

        hasilPencarian.textContent =
            "Keahlian tidak ditemukan.";

        hasilPencarian.classList.remove("pesan-sukses");

        hasilPencarian.classList.add("pesan-error");

    }

});


// ==========================================
// FILTER KATEGORI
// ==========================================

const filterKategori =
    document.getElementById("filterKategori");


filterKategori.addEventListener("change", function() {

    const kategoriDipilih = filterKategori.value;

    let hasilFilter;


    if (kategoriDipilih === "Semua") {

        hasilFilter = dataKeahlian;

    } else {

        hasilFilter =
            cariKategori(dataKeahlian, kategoriDipilih);

    }


    tampilkanData(hasilFilter);


    hasilPencarian.classList.remove("pesan-error");

    hasilPencarian.classList.add("pesan-sukses");


    if (kategoriDipilih === "Semua") {

        hasilPencarian.textContent =
            "Menampilkan semua data keahlian.";

    } else {

        hasilPencarian.textContent =
            "Menampilkan " +
            hasilFilter.length +
            " data kategori " +
            kategoriDipilih +
            ".";

    }

});
