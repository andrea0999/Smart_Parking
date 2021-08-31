#!/bin/bash
export PATH = "D:\Faculta\AN III\practica\smart_parking_app>"
exec("ffmpeg -i rtsp://admin:Garage2021@92.87.91.50:554/Streaming/Channels/1/ -fflags flush_packets -max_delay 5 -flags -global_header -hls_time 5 -hls_list_size 3 -vcodec copy -y .\server\videos\ipcam\index.m3u8")