import java.awt.image.BufferedImage;
import java.awt.image.DataBufferByte;
import java.io.IOException;
import javax.imageio.ImageIO;
import java.awt.Color;
import java.io.*;
import java.util.Scanner;

class MakeImageBin {

   public static void main(String[] args) throws IOException {

      BufferedImage image = ImageIO.read(MakeImageBin.class.getResource("test.bmp"));

      //System.out.println("");

      System.out.println("Testing...");
      
      int width = image.getWidth();
      int height = image.getHeight();
      // int width = 400;
      // int height = 400;
      int[] rs = new int[width*height];
      int[] gs = new int[width*height];
      int[] bs = new int[width*height];

      System.out.println("Width:: "+width);
      System.out.println("Height:: "+height);

      for (int row = 0; row < height; row++) {
         for (int col = 0; col < width; col++) {
            //result[row][col] = image.getRGB(row, col);
            Color clr = new Color(image.getRGB(col, row));
            int idx = (width*(row)) +col;
            rs[idx] = clr.getRed();
            gs[idx] = clr.getGreen();
            bs[idx] = clr.getBlue();
         }
      }

      System.out.println("naeeem:: "+Integer.toHexString(rs[97])+Integer.toHexString(gs[97])+Integer.toHexString(bs[97]));
      System.out.println("length:: "+rs.length);
      //return result;

      String s = "";
      String t = "";
      // Scanner input = new Scanner(System.in);
      File file = new File("pixelraw.bin");
      file.createNewFile();
      FileWriter writer = new FileWriter(file);
      //System.out.print("Write Something: ");
      //s = input.next();
      
      char[] sarr = new char[width*height];
      for (int i = 0; i < width*height; i++) {
         if(rs[i] > 200){ sarr[i] = '0'; }
         else { sarr[i] = '1'; }

      }
      System.out.println("sarr:: "+sarr.length);

      for ( int ii = 0; ii<width*height; ii++ ) {
         s += sarr[ii]; // + "','";
      }

      writer.write(s);
      //writer.write("\n");
      writer.close();

      // INT array maker

      /* throws exception. use nodejs instead: node make-pixelint.js
      File file2 = new File("pixelint.c");
      file2.createNewFile();
      FileWriter writer2 = new FileWriter(file2);
      
      String st1 = new String(sarr);
      for ( int iii = 0; iii<width*height; iii+=32 ) {
         char[] s32 = new char[32];
         st1.getChars(iii,iii+32,s32,0);
         String st2 = new String(s32);
         int n32 = Integer.parseInt(st2, 2);
         // t += bin2dec(n32) + ",";
         t += n32 + ",";
      }

      writer2.write(t);
      writer2.close();*/
   }

   public static int bin2dec(int binary) {
      int decimal = 0;
      int power = 0;
      while(true) {
         if(binary == 0) {
            break;
         } else {
            int tmp = binary%10;
            decimal += tmp*Math.pow(2,power);
            binary = binary/10;
            power++;
         }
      }
      return decimal;
   }
}