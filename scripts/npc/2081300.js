/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/*
 *@Author:  Moogra
 *@NPC:     4th Job Bowman Advancement NPC
 *@Purpose: Handles 4th job.
 */

var status;
 
function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && status == 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
    
                if(status == 0) {
                        if(cm.getLevel() < 120 || Math.floor(cm.getJobId() / 100) != 3) {
                                cm.sendOk("Please don't bother me right now, I am trying to concentrate.");
                                cm.dispose();
                        } else if (!cm.isQuestCompleted(6924)) { 
                                cm.sendOk("You have not yet passed my trials. I can not advance you until you do so.");
                                cm.dispose();
                        } else if ( cm.getJobId() % 100 % 10 != 2) {
                                cm.sendYesNo("You did a marvellous job passing my test. Are you ready to advance to your 4th job?");
                        } else {
                                cm.sendSimple("If I must, I can teach you the art of your class.\r\n#b#L0#Teach me the skills of my class.#l");
                                //cm.dispose();
                        }
                } else if(status == 1) {
                        if (mode >= 1 && cm.getJobId() % 100 % 10 != 2) {
                                cm.changeJobById(cm.getJobId() + 1);
                                if(cm.getJobId() == 312) {
                                        cm.teachSkill(3120005, 0, 30, -1); // expert
                                        cm.teachSkill(3121000, 0, 30, -1); // warrior
                                        cm.teachSkill(3121002, 0, 30, -1); // eyes
                                        cm.teachSkill(3121003, 0, 30, -1); // breath
                                        cm.teachSkill(3121004, 0, 30, -1); // hurricane
                                        cm.teachSkill(3121006, 0, 30, -1); // pheonix
                                        cm.teachSkill(3121007, 0, 30, -1); // hamstring
                                        cm.teachSkill(3121008, 0, 30, -1); // concentrate
                                        cm.teachSkill(3121009, 0, 5,  -1); // will
                                } else if(cm.getJobId() == 322) {
                                        cm.teachSkill(3220004, 0, 30, -1); // boost
                                        cm.teachSkill(3221000, 0, 30, -1); // warrior
                                        cm.teachSkill(3221001, 0, 30, -1); // piercing
                                        cm.teachSkill(3221002, 0, 30, -1); // eyes
                                        cm.teachSkill(3221003, 0, 30, -1); // breath
                                        cm.teachSkill(3221005, 0, 30, -1); // frostprey
                                        cm.teachSkill(3221006, 0, 30, -1); // blind
                                        cm.teachSkill(3221007, 0, 30, -1); // snipe
                                        cm.teachSkill(3221008, 0, 5,  -1); // will
                                }
                        } else if(mode >= 0 && cm.getJobId() % 100 % 10 == 2) {
                                cm.sendOk("It is done. Leave me now.");
                        }
                        
                        cm.dispose();
                }
        }
}
