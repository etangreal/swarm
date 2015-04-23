
Vagrant.require_version ">= 1.6.0"

# -------------------------------------------------------------------------------------------------
# DECLARATIONS
# -------------------------------------------------------------------------------------------------

ROOT = File.dirname(File.absolute_path(__FILE__))

VAGRANTFILE_API_VERSION = '2'

BASE_BOX_URL          = ENV['BASE_BOX_URL']    || 'https://oss-binaries.phusionpassenger.com/vagrant/boxes/latest/'

VIRTUAL_BOX_URL       = ENV['VAGRANT_BOX_URL'] || BASE_BOX_URL + 'ubuntu-14.04-amd64-vbox.box'
VMWARE_BOX_URL        = ENV['VMWARE_BOX_URL']  || BASE_BOX_URL + 'ubuntu-14.04-amd64-vmwarefusion.box'

BASEIMAGE_PATH        = ENV['BASEIMAGE_PATH' ] || '.'
PASSENGER_DOCKER_PATH = ENV['PASSENGER_PATH' ] || 'build/passenger-docker'
DOCKERIZER_PATH       = ENV['DOCKERIZER_PATH'] || 'build/dockerizer'

BOX_NAME    = 'phusion-open-ubuntu-14.04-amd64'
# BOX_VERSION = '1.0'
BOX_URL     = VIRTUAL_BOX_URL
# 'http://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-amd64-vagrant-disk1.box'

# HOSTNAME    = "ubuntu-phusion"

VB_GUI     = FALSE
VB_MEMORY  = 2048
VB_CPUS    = 1

# -------------------------------------------------------------------------------------------------
# VAGRANT
# -------------------------------------------------------------------------------------------------

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  # -----------------------------------------------------------------------------------------------
  # Plugin
  # -----------------------------------------------------------------------------------------------

  if Vagrant.has_plugin?("vagrant-vbguest")
    config.vbguest.auto_update = false
  end

  # -----------------------------------------------------------------------------------------------

  if Vagrant.has_plugin?("vagrant-cachier")
    # Configure cached packages to be shared between instances of the same base box.
    # More info on the "Usage" link above
    config.cache.scope = :box

    # OPTIONAL: If you are using VirtualBox, you might want to use that to enable
    # NFS for shared folders. This is also very useful for vagrant-libvirt if you
    # want bi-directional sync
    config.cache.synced_folder_opts = {
      type: :nfs,
      # The nolock option can be useful for an NFSv3 client that wants to avoid the
      # NLM sideband protocol. Without this option, apt-get might hang if it tries
      # to lock files needed for /var/cache/* operations. All of this can be avoided
      # by using NFSv4 everywhere. Please note that the tcp option is not the default.
      mount_options: ['rw', 'vers=4', 'tcp', 'nolock']
    }
  end 

  # -----------------------------------------------------------------------------------------------
  # Config
  # -----------------------------------------------------------------------------------------------

  config.vm.box         = BOX_NAME
  # config.vm.box_version = BOX_VERSION
  config.vm.box_url     = BOX_URL

  # -----------------------------------------------------------------------------------------------
  # Networking
  # -----------------------------------------------------------------------------------------------

  # config.vm.hostname        = HOSTNAME
  config.ssh.forward_agent  = true

  # config.vm.network :private_network, ip: "10.0.0.2"

  # -----------------------------------------------------------------------------------------------

  # PORT FORWARDING:
  #   HOST(MAC-OSX) -> GUEST(UBUNTU) -> CONTAINER(DOCKER)
  #   4200          -> 4200          -> 4200
  #   3000          -> 3000          -> 3000
  #   8080          -> 8080          -> 8080

  # config.vm.network "forwarded_port", host: 4200, guest: 4200
  # config.vm.network "forwarded_port", host: 3000, guest: 3000
  # config.vm.network "forwarded_port", host: 8080, guest: 8080

  # -----------------------------------------------------------------------------------------------
  # Synchronized Folders
  # -----------------------------------------------------------------------------------------------

  # config.vm.synced_folder ".", "/vagrant"
  # config.vm.synced_folder ".", "/vagrant", type: "nfs"
  # config.vm.synced_folder ".", "/home/vagrant", type: "rsync", rsync__exclude: ".git/"

  # config.vm.synced_folder ".", "/vagrant", type: "rsync", rsync__exclude: ".git/"
  #   rsync__args: ["--verbose", "--rsync-path='sudo rsync'", "--archive", "--delete", "-z"]

  # -----------------------------------------------------------------------------------------------

  # passenger_docker_path = File.absolute_path(PASSENGER_DOCKER_PATH, ROOT)

  # if File.directory?(passenger_docker_path)
  #   config.vm.synced_folder passenger_docker_path, '/vagrant/passenger-docker'
  # end

  # -----------------------------------------------------------------------------------------------

  # baseimage_path = File.absolute_path(BASEIMAGE_PATH, ROOT)

  # if File.directory?(baseimage_path)
  #   config.vm.synced_folder baseimage_path, "/vagrant/baseimage-docker"
  # end

  # -----------------------------------------------------------------------------------------------

  # dockerizer_path = File.absolute_path(DOCKERIZER_PATH, ROOT)

  # if File.directory?(dockerizer_path)
  #   config.vm.synced_folder dockerizer_path, '/vagrant/dockerizer'
  # end

  # -----------------------------------------------------------------------------------------------
  # Provision
  # -----------------------------------------------------------------------------------------------

  if Dir.glob("#{File.dirname(__FILE__)}/.vagrant/machines/default/*/id").empty?
    config.vm.provision :shell, :path => "build/docker.sh"
    config.vm.provision :shell, :path => "build/docker-pull.sh"
    config.vm.provision :shell, :path => "build/nodejs.sh"
    # config.vm.provision :shell, :inline => $script
  end

  # -----------------------------------------------------------------------------------------------
  # VirtualBox
  # -----------------------------------------------------------------------------------------------

  config.vm.provider :virtualbox do |vb|
    # vb.check_guest_additions = false
    # vb.functional_vboxsf     = false

    vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]

    # vb.gui    = VB_GUI
    # vb.memory = VB_MEMORY
    # vb.cpus   = VB_CPUS
  end

  # -----------------------------------------------------------------------------------------------
  # VMWare Fusion
  # -----------------------------------------------------------------------------------------------

  config.vm.provider :vmware_fusion do |f, override|
    override.vm.box_url = VMWARE_BOX_URL
    f.vmx['displayName'] = 'baseimage-docker'
  end

  # -----------------------------------------------------------------------------------------------

end

# -------------------------------------------------------------------------------------------------
# END
# -------------------------------------------------------------------------------------------------

