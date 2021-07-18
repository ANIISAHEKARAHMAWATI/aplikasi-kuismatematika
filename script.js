//Deklarasi Variabel
var count=1, total=0, correct=0, wrong=0, lim=0;
var ans = "", question ="", input="", width= 220, t = '', n1, n2, n3, r1, r2, mode=0;
var opr = [];

//Menyembunyikan Quiz Body di Awal
$(document).ready(function() {
    $("#quizbody").hide();
});

//Pilihan Tingkat Kesulitan
function level(lvl) {
    if (lvl<5) {
        opr = ["+", "-", "*"];        
        if (lvl==1)
            lim = 5;
        else if (lvl==2)
            lim = 10;
        else if (lvl==3)
            lim = 15;
        else if (lvl==4)
            lim = 30;            
    }
    else if (lvl==5) {
        lim = 50;
        opr = ["+", "-", "", ""];
    }
    $("#diff").hide();
    $("#quizbody").show();
    if (mode==1) {
        $("#donebtn").hide();
    }
    else {
        $("#donebtn").show();
    }
    quiz();
}

//Menghasilkan Pertanyaan 
function quiz() {
    var len = opr.length;    
    n1 = Math.floor(Math.random() * lim);
    n2 = Math.floor(Math.random() * lim);
    n3 = Math.floor(Math.random() * lim);    
    r1 = opr[Math.floor(Math.random()*len)];
    r2 = opr[Math.floor(Math.random()*len)];    
    question = n1+r1+n2+r2+n3;
    ans = eval(question);
    $("#question").html(question+" = ?");
    $("#o"+(Math.floor(Math.random() * 4)+1)).html(ans);
    t = setInterval(timeCheck, 120);
}

//Mengecek Jawaban
function check() {
    var input = $("#answer").val();
    if(input == ans) {
        Swal.fire({
          icon: 'success',
          title: 'Benar',
          text: ans + ' adalah benar.',
          showConfirmButton: false,
          timer: 1500
        });
        correct++;
        $("#correct").html(correct);
    }
    else {
        Swal.fire({
          icon: 'error',
          title: 'Salah',
          text: 'Jawabannya adalah '+ans,
          showConfirmButton: false,
          timer: 1500
        });
        wrong++;
        $("#wrong").html(wrong);
    } 
    $("#answer").val('');
    count++;
    total++;
    $("#no").html(count);
    $("#total").html(total);
    clearInterval(t);
    width = 220;
    bar.style.width = '200px';
    quiz();
}

//Memasukkan Angka
function ins(num) {
    var chk = $("#answer").val().includes(".");
    if ($("#answer").val() != '' && num == '-' || num == "." && chk)
    {
      //Tidak ada apapun  
    }
    
    else {
      $("#answer").val($("#answer").val() + num);
      if (mode==1) {
          if ($("#answer").val() ==ans)
              check();
      }
    }      
}

//Pengatur Waktu
function timeCheck() {
    var bar = document.getElementById("bar");
    if(width == 0) {
        clearInterval(t);
        Swal.fire({
          icon: 'warning',
          title: 'Waktu Habis',
          text: 'Jawabannya adalah '+ans,
          showConfirmButton: false,
          timer: 1500
        });
        wrong++;
        $("#wrong").html(wrong);
    quiz();
    width = 220;
    bar.style.width = '200px';
    }
    else {
        width--;
        bar.style.width = width+'px';
    }
}

//Fungsi Lain
$(function() {

   //Mode Cepat
    $("#mode").click(function() {
        if (mode==0) {
            $(this).html("Mode Cepat(ON)");
            mode=1;
        }
        else {
            $(this).html("Mode Cepat(OFF)");
            mode=0;
        }
    });
    
    //Pengulangan
    $("#res").click(function() {
        $("#diff").show();
        $("#quizbody").hide();
        count=1, total=0, correct=0, wrong=0, lim=0;
        $("#correct").html(correct);
        $("#wrong").html(wrong);
        $("#total").html(total);
        input.value = "";
        clearInterval(t);
        width = 220;
        bar.style.width = '200px';
    });
    
    //Menghapus Sebuah Angka
    $("#del").click(function() {
        var txt = $("#answer").val();
        txt = txt.slice(0, -1);
        $("#answer").val(txt);
    });
   
   //Penjelasan Mode Cepat
    $("#ex").click(function() {
        Swal.fire({
          icon: 'info',
          title: 'Mode Cepat',
          text: 'Ketika Mode Cepat menyala(ON), Sistem akan otomatis mendeteksi jawaban yang benar',
          showConfirmButton: true,
        });
    });
});