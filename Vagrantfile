Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/xenial64"
  config.vm.network "private_network", ip: "192.168.10.200"
  config.vm.provision :shell, :path => "bootstrap.sh"
  config.vm.network "forwarded_port", guest: 5000, host: 5000
  config.vm.synced_folder "./", "/vagrant", :mount_options => ["dmode=774", "fmode=775"]
end
