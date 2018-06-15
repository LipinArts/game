export default class AIMonsterUnit {

	static generateAITurn(playerUnits, botsUnits, ownAbilities) {
		let bestToDoDamageOrKillTurn = this.getBestToDoDamageOrKillTurn(playerUnits, ownAbilities);
		let bestTurn;
		let ToDoMaxHealAlly;
		if (bestToDoDamageOrKillTurn.possibleKill) {
			bestTurn = bestToDoDamageOrKillTurn;
		} else {
			ToDoMaxHealAlly = this.getTurnToDoMaxHealAlly(botsUnits, ownAbilities);
			if (ToDoMaxHealAlly.possibleToHeal) {
				bestTurn = this.getBestTurnByCompare(bestToDoDamageOrKillTurn, ToDoMaxHealAlly);
			}
			else {
				bestTurn = bestToDoDamageOrKillTurn;
			}
		}

		return {
			selectedUnit: bestTurn.bestTarget,
			selectedImpact: bestTurn.bestImpact
		};

	}

	static getBestToDoDamageOrKillTurn(playerUnits, ownAbilities) {
		let possibleKill = false;
		let bestTarget;
		let bestImpact;
		let abilitiesNames = Object.keys(ownAbilities);
		playerUnits.forEach(unit => {
			abilitiesNames.forEach(abilityName => {
				let impact = ownAbilities[abilityName];
				if (unit.hp > 0 && impact.damage > 0) {
					if (unit.hp - impact.damage <= 0) {
						possibleKill = true;
						if (!bestTarget) {
							bestTarget = unit;
							bestImpact = impact;
						} else {
							if (unit.hp > bestTarget.hp) {
								bestTarget = unit;
								bestImpact = impact;
							} else {
								if (bestImpact.lv > impact && bestTarget.hp === unit.hp) {
									bestImpact = impact;
								}
							}
						}
					} else {
						if (!possibleKill) {
							if (!bestImpact) {
								bestImpact = impact;
							}
							else {
								if (bestImpact.damage < impact.damage) {
									bestImpact = impact;
								}
							}
							if (!bestTarget) {
								bestTarget = unit;
							}
							else {
								if (bestTarget.hp > unit.hp) {
									bestTarget = unit;
								}
							}
						}
					}
				}
			});
		});

		return {
			possibleKill: possibleKill,
			bestTarget: bestTarget,
			bestImpact: bestImpact
		};
	}

	static getTurnToDoMaxHealAlly(botsUnits, ownAbilities) {
		let bestTarget;
		let bestImpact;
		let bestHealInPercent = 0;
		let possibleToHeal = false;
		let abilitiesNames = Object.keys(ownAbilities);
		botsUnits.forEach(unit => {
			abilitiesNames.forEach(abilityName => {
				let impact = ownAbilities[abilityName];
				if (unit.hp > 0 && impact.damage < 0) {
					possibleToHeal = true;
					let heal;
					let impactHeal = impact.damage * -1;
					if (unit.hp + impactHeal <= unit.maxHP) {
						heal = impactHeal;
					}
					else {
						heal = impactHeal - ((unit.hp + impactHeal) - unit.maxHP);
					}
					let healInPercent = (heal / unit.hp) * 100;
					if (bestHealInPercent < healInPercent) {
						bestHealInPercent = healInPercent;
						bestTarget = unit;
						bestImpact = impact;
					}
				}
			});
		});

		// when all unit fullHP
		if (bestHealInPercent === 0) {
			possibleToHeal = false;
		}

		return {
			possibleToHeal: possibleToHeal,
			bestTarget: bestTarget,
			bestImpact: bestImpact
		};
	}

	static getBestTurnByCompare(turnDamage, turnHeal) {
		if (turnDamage.bestImpact.damage > (turnHeal.bestImpact.damage * -1)) {
			return turnDamage;
		}
		else {
			return turnHeal;
		}
	}
}