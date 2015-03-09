package main

import (
    "fmt"       // A package in the Go standard library.
    "code.google.com/p/gopacket"
    "code.google.com/p/gopacket/pcap"
    "code.google.com/p/gopacket/layers"

)


func main(){
	fmt.Println("Hello World!");



		if handle, err := pcap.OpenLive("eno16777736", 1600, true, 0); err != nil {
		  panic(err)
		} else if err := handle.SetBPFFilter("tcp and port 8005"); err != nil {  // optional
		  panic(err)
		} else {
		  packetSource := gopacket.NewPacketSource(handle, handle.LinkType())
		  for packet := range packetSource.Packets() {
		 

		    // Get the TCP layer from this packet
			if tcpLayer := packet.Layer(layers.LayerTypeTCP); tcpLayer != nil {
			  fmt.Println("This is a TCP packet!")
			  // Get actual TCP data from this layer
			  tcp, _ := tcpLayer.(*layers.TCP)
			  fmt.Printf("From src port %d to dst port %d\n", tcp.SrcPort, tcp.DstPort)
			  tcp.SrcPort = 5000;
			  fmt.Printf("New src src port is %d",tcp.SrcPort);
			}
			// Iterate over all layers, printing out each layer type
			for _, layer := range packet.Layers() {
			  fmt.Println("PACKET LAYER:", layer.LayerType())


			}



	  	}
	}

	

	
}