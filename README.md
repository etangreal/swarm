# REQUIREMENTS

  - vagrant (>= 1.5)
  - virtualbox

# SETUP

  - git clone https://github.com/etangreal/swarm.git
  - cd swarm
  - vagrant up
  - vagrant ssh
  - cd /vagrant/src

# USAGE

  - ./chaos-monkey
  	(lists the available options)
  - ./chaos-monkey start
  - ./chaos-monkey ring
  - ./chaos-monkey names
   (list the containers along with their ip-addresses)

# TESTING

  - docker attach aa
  (attach to a container)
  - ctrl-c
  (break out listening/mirroring mode)
  - ifconfig
  - ping 172.17.0.2
  (replace the ip-address according to your instance's assigned ips)
