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

  - ./chaos-monkey (lists the available options)
  - ./chaos-monkey start
  - ./chaos-monkey names (list the containers along with their ip-addresses)
  - ./chaos-monkey fast
  - ./chaos-monkey netsplit
  - ./chaos-monkey bridge
  - ./chaos-monkey ring
  
# TO VIEWING DOCKER CONTAINER OUTPUT
  - open an additional console
  - vagrant ssh
  - docker ps
  - docker attach aa (attach to one of the container e.g: 'aa', 'bb', 'cc', 'dd')
