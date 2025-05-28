<<<<<<< HEAD
=======
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

>>>>>>> 2466d3184865b72c4b91faae2d1cb5ecffd9f7d2
// Fungsi untuk validasi ukuran file
function validateFileSize(file, maxSizeMB) {
  if (!file) {
    Swal.fire({
      icon: "warning",
      title: "Oops!",
      text: "File tidak ditemukan.",
    });
    return false;
  }
  const maxSizeBytes = maxSizeMB * 1024 * 1024; // Konversi MB ke bytes
  if (file.size > maxSizeBytes) {
    Swal.fire({
      icon: "warning",
      title: "Oops!",
      text: `File ${file.name} melebihi batas ukuran ${maxSizeMB}MB.`,
    });
    return false;
  }
  return true;
}

async function submitForm(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  // Tampilkan loading
  Swal.fire({
    title: "Mengirim...",
    text: "Mohon tunggu sebentar.",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  // Validasi file KTP
  const ktpFile = formData.get("ktp");
  if (!validateFileSize(ktpFile, 2)) {
    return; // Hentikan proses jika validasi gagal
  }

  // Upload file KTP
  const { data: ktpData, error: ktpError } = await supabase.storage
    .from("dokumen")
    .upload(`ktp/${formData.get("nik")}_${ktpFile.name}`, ktpFile);

  if (ktpError) {
    console.error("Error uploading KTP:", ktpError);
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Gagal mengunggah KTP. Silakan coba lagi.",
    });
    return;
  }

  // Validasi file KK
  const kkFile = formData.get("kk");
  if (!validateFileSize(kkFile, 2)) {
    return; // Hentikan proses jika validasi gagal
  }

  // Upload file KK
  const { data: kkData, error: kkError } = await supabase.storage
    .from("dokumen")
    .upload(`kk/${formData.get("nik")}_${kkFile.name}`, kkFile);

  if (kkError) {
    console.error("Error uploading KK:", kkError);
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Gagal mengunggah KK. Silakan coba lagi.",
    });
    return;
  }

  // Simpan data ke tabel
  const { data, error } = await supabase.from("formulir").insert([
    {
      nama: formData.get("nama"),
      nik: formData.get("nik"),
      tempat_lahir: formData.get("tempat_lahir"),
      tanggal_lahir: formData.get("tanggal_lahir"),
      no_hp: formData.get("no_hp"),
      email: formData.get("email"),
      alamat: formData.get("alamat"),
      pekerjaan: formData.get("pekerjaan"),
      penghasilan: formData.get("penghasilan"),
      ktp: supabase.storage
        .from("dokumen")
        .getPublicUrl(`ktp/${formData.get("nik")}_${ktpFile.name}`).data
        .publicUrl,
      kk: supabase.storage
        .from("dokumen")
        .getPublicUrl(`kk/${formData.get("nik")}_${kkFile.name}`).data
        .publicUrl,
      persetujuan: formData.get("persetujuan") === "on",
    },
  ]);

  if (error) {
    console.error("Error inserting data:", error);
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Gagal menyimpan data. Silakan coba lagi.",
    });
  } else {
    console.log("Success:", data);
    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Pendaftaran berhasil dikirim!",
    }).then(() => {
      // Reset form setelah berhasil
      form.reset();
    });
  }
}

document.querySelector("form").addEventListener("submit", submitForm);
