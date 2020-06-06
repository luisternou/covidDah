#!/bin/bash
echo -e "\e[1;31m Please be aware that during the update the 
entire KirEx plattform is not available \e[0m" 

read -r -p "Are you sure? [y/N] " response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]
then
echo -e "\e[1;32m Ok, then let's get this road on the show \e[0m" 
sleep 3
echo -e "\e[1;34m Stopping services \e[0m" 
sh ./stop.sh
sleep 2
echo -e "\e[1;34m Getting Update from Repository\e[0m" 
git pull
sleep 2 
echo -e "\e[1;34m Applying Update\e[0m"
sleep 2
echo -e "\e[1;32m Starting Services again\e[0m"
sh ./start.sh
echo -e "\e[1;32m Update complete\e[0m"
else
   echo -e "\e[1;32m Ok fine, maybe next time!\e[0m" 
fi


