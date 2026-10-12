$(document).ready(function () {

    // =====================================
    // 1. DATA KEAHLIAN MAHASISWA
    // =====================================

    let dataKeahlian = [
        { id: 1, nama: "HTML", kategori: "Web", nilai: 85 },
        { id: 2, nama: "CSS", kategori: "Web", nilai: 80 },
        { id: 3, nama: "Bootstrap", kategori: "Web", nilai: 82 },
        { id: 4, nama: "JavaScript", kategori: "Programming", nilai: 75 },
        { id: 5, nama: "Python", kategori: "Programming", nilai: 78 },
        { id: 6, nama: "Microsoft Office", kategori: "Office", nilai: 88 }
    ];

    // ID untuk setiap data baru
    let idBerikutnya = 7;

    // Menyimpan kata pencarian dan kategori aktif
    let kataKunci = "";
    let kategoriAktif = "Semua";


    // =====================================
    // 2. MENGHITUNG RATA-RATA NILAI
    // =====================================

    function hitungRataRata(data) {
        if (data.length === 0) {
            return 0;
        }

        let total = 0;

        for (const keahlian of data) {
            total += keahlian.nilai;
        }

        return total / data.length;
    }


    // =====================================
    // 3. MENENTUKAN LEVEL KEAHLIAN
    // =====================================

    function tentukanLevel(nilai) {
        if (nilai >= 85) {
            return "Sangat Baik";
        } else if (nilai >= 75) {
            return "Baik";
        } else {
            return "Perlu Latihan";
        }
    }


    // =====================================
    // 4. MENAMPILKAN NOTIFIKASI JQUERY
    // =====================================

    function tampilkanPesan(pesan, jenis) {
        const warna = jenis === "sukses"
            ? "pesan-sukses"
            : "pesan-error";

        $("#pesanForm")
            .stop(true, true)
            .hide()
            .removeClass("pesan-sukses pesan-error")
            .addClass(warna)
            .text(pesan)
            .fadeIn(300);

        // Pesan hilang setelah 3 detik
        $("#pesanForm").delay(3000).fadeOut(500);
    }


    // =====================================
    // 5. MENAMPILKAN DATA KE TABEL
    // =====================================

    function tampilkanData() {

        const tabel = $("#tabelKeahlian");
        tabel.empty();

        // Memfilter data berdasarkan pencarian dan kategori
        const hasilFilter = dataKeahlian.filter(function (item) {

            const cocokNama = item.nama
                .toLowerCase()
                .includes(kataKunci);

            const cocokKategori =
                kategoriAktif === "Semua" ||
                item.kategori === kategoriAktif;

            return cocokNama && cocokKategori;
        });

        // Membuat baris tabel menggunakan DOM
        for (const item of hasilFilter) {

            const baris = $("<tr>");

            $("<td>").text(item.nama).appendTo(baris);
            $("<td>").text(item.kategori).appendTo(baris);
            $("<td>").text(item.nilai).appendTo(baris);
            $("<td>").text(tentukanLevel(item.nilai)).appendTo(baris);

            // Membuat tombol hapus
            const tombolHapus = $("<button>")
                .attr("type", "button")
                .addClass("btn btn-danger btn-sm btn-hapus")
                .attr("data-id", item.id)
                .text("Hapus");

            $("<td>")
                .append(tombolHapus)
                .appendTo(baris);

            tabel.append(baris);
        }

        // Menampilkan pesan jika data tidak ditemukan
        if (hasilFilter.length === 0) {
            const barisKosong = $("<tr>");
            $("<td>")
                .attr("colspan", 5)
                .addClass("text-center")
                .text("Data keahlian tidak ditemukan.")
                .appendTo(barisKosong);

            tabel.append(barisKosong);
        }

        // Menampilkan jumlah hasil dan rata-rata seluruh data
        $("#jumlahData").text(
            "Menampilkan " + hasilFilter.length +
            " dari " + dataKeahlian.length +
            " data keahlian. Rata-rata seluruh nilai: " +
            hitungRataRata(dataKeahlian).toFixed(2)
        );
    }


    // =====================================
    // 6. EVENT PENCARIAN
    // =====================================

    $("#formCari").on("submit", function (event) {

        event.preventDefault();

        kataKunci = $("#inputCari").val().trim().toLowerCase();

        tampilkanData();

        if (kataKunci === "") {
            tampilkanPesan(
                "Menampilkan semua data sesuai filter kategori.",
                "sukses"
            );
        } else {
            tampilkanPesan(
                "Pencarian selesai.",
                "sukses"
            );
        }
    });


    // =====================================
    // 7. EVENT FILTER KATEGORI
    // =====================================

    $("#filterKategori").on("change", function () {

        kategoriAktif = $(this).val();

        tampilkanData();

        tampilkanPesan(
            "Filter kategori berhasil diterapkan.",
            "sukses"
        );
    });


    // =====================================
    // 8. EVENT TAMBAH DATA DAN VALIDASI
    // =====================================

    $("#formTambah").on("submit", function (event) {

        event.preventDefault();

        const nama = $("#namaKeahlian").val().trim();
        const kategori = $("#kategoriBaru").val();
        const nilaiInput = $("#nilaiBaru").val();

        // Memeriksa input kosong
        if (nama === "" || nilaiInput === "") {
            tampilkanPesan(
                "Nama keahlian dan nilai wajib diisi.",
                "error"
            );
            return;
        }

        const nilai = Number(nilaiInput);

        // Memeriksa nilai harus bilangan bulat 0-100
        if (
            !Number.isInteger(nilai) ||
            nilai < 0 ||
            nilai > 100
        ) {
            tampilkanPesan(
                "Nilai harus berupa bilangan bulat 0 sampai 100.",
                "error"
            );
            return;
        }

        // Memeriksa agar nama tidak duplikat
        const namaSudahAda = dataKeahlian.some(function (item) {
            return item.nama.toLowerCase() === nama.toLowerCase();
        });

        if (namaSudahAda) {
            tampilkanPesan(
                "Keahlian tersebut sudah ada.",
                "error"
            );
            return;
        }

        // Menambahkan data baru ke array
        dataKeahlian.push({
            id: idBerikutnya,
            nama: nama,
            kategori: kategori,
            nilai: nilai
        });

        idBerikutnya++;

        // Mengosongkan pencarian dan menampilkan data baru
        kataKunci = "";
        kategoriAktif = "Semua";

        $("#inputCari").val("");
        $("#filterKategori").val("Semua");

        tampilkanData();

        this.reset();

        tampilkanPesan(
            "Keahlian berhasil ditambahkan.",
            "sukses"
        );
    });


    // =====================================
    // 9. EVENT HAPUS DATA
    // =====================================

    $("#tabelKeahlian").on("click", ".btn-hapus", function () {

        // Mengambil ID dari tombol yang diklik
        const id = Number($(this).attr("data-id"));

        // Menghapus data berdasarkan ID
        dataKeahlian = dataKeahlian.filter(function (item) {
            return item.id !== id;
        });

        // Memperbarui tabel
        tampilkanData();

        tampilkanPesan(
            "Keahlian berhasil dihapus.",
            "sukses"
        );
    });


    // =====================================
    // 10. HASIL PERHITUNGAN DI CONSOLE
    // =====================================

    console.log("=== DATA KEAHLIAN MAHASISWA ===");
    console.log(dataKeahlian);

    console.log(
        "Rata-rata nilai:",
        hitungRataRata(dataKeahlian).toFixed(2)
    );

    console.log("=== KEAHLIAN KATEGORI WEB ===");

    for (const item of dataKeahlian) {
        if (item.kategori === "Web") {
            console.log(item.nama + " - Nilai: " + item.nilai);
        }
    }

    // Menampilkan data pertama kali
    tampilkanData();

});
