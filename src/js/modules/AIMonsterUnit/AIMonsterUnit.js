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

		// for best perormance 2 logic methods use the same combinatorics cycles
		// the first try to find combination target-impact when we will kill target
		// the second just find the best combination target-impact for will do max damage to player unit
		playerUnits.forEach(target => {
			abilitiesNames.forEach(abilityName => {
				let impact = ownAbilities[abilityName];
				if (this.isTargetAliveAndImpactNotHeal(target, impact)) {
					if (this.isTargetWillKilledAfterImpact(target, impact)) {
						possibleKill = true;
						const updatedBesturn = this.updateBestTurnForPossibilityToKill(bestTarget, bestImpact, target, impact);
						bestTarget = updatedBesturn.bestTarget;
						bestImpact = updatedBesturn.bestImpact;
					} else {
						if (!possibleKill) {
							const updatedBesturn = this.updateBestTurnForDoMaxDamage(bestTarget, bestImpact, target, impact);
							bestTarget = updatedBesturn.bestTarget;
							bestImpact = updatedBesturn.bestImpact;
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
		let bestHealInPercents = 0;
		let possibleToHeal = false;
		let abilitiesNames = Object.keys(ownAbilities);
		botsUnits.forEach(target => {
			abilitiesNames.forEach(abilityName => {
				let impact = ownAbilities[abilityName];
				if (this.isTargetAliveAndImpactHeal(target, impact)) {
					possibleToHeal = true;
					let heal;
					let impactHeal = impact.damage * -1;
					if (this.isPossibleToHealOverMaxHPOfTarget(target, impactHeal)) {
						heal = impactHeal - ((target.hp + impactHeal) - target.maxHP);
					}
					else {
						heal = impactHeal;
					}
					let healInPercent = (heal / target.hp) * 100;
					if (bestHealInPercents < healInPercent) {
						bestHealInPercents = healInPercent;
						bestTarget = target;
						bestImpact = impact;
					}
				}
			});
		});

		// when all units fullHP
		if (bestHealInPercents === 0) {
			possibleToHeal = false;
		}

		return {
			possibleToHeal: possibleToHeal,
			bestTarget: bestTarget,
			bestImpact: bestImpact
		};
	}

	static getBestTurnByCompare(turnDamage, turnHeal) {
		if (turnDamage.bestImpact.damage >= (turnHeal.bestImpact.damage * -1)) {
			return turnDamage;
		}
		else {
			return turnHeal;
		}
	}

	static updateBestTurnForPossibilityToKill(bestTarget, bestImpact, target, impact) {
		if (!bestTarget) {
			bestTarget = target;
			bestImpact = impact;
		} else {
			if (this.isCurrentTargetBestThenLastBestTarget(target, bestTarget)) {
				bestTarget = target;
				bestImpact = impact;
			} else {
				if (this.isCurrentImpactLowerCostThenLastBestImpactForTheSameTarget(target, bestTarget, bestImpact, impact)) {
					bestImpact = impact;
				}
			}
		}

		return {
			bestTarget: bestTarget,
			bestImpact: bestImpact
		};
	}

	static updateBestTurnForDoMaxDamage(bestTarget, bestImpact, target, impact) {
		if (!bestImpact) {
			bestImpact = impact;
		}
		else {
			if (this.isCurrentImpactWillDoMoreDamageThenLastBestImpact(impact, bestImpact)) {
				bestImpact = impact;
			}
		}
		if (!bestTarget) {
			bestTarget = target;
		}
		else {
			if (this.isCurrentTargetBestThenLastBestTarget(target, bestTarget)) {
				bestTarget = target;
			}
		}

		return {
			bestTarget: bestTarget,
			bestImpact: bestImpact
		};
	}

	static isTargetAliveAndImpactNotHeal(target, impact) {
		return target.hp > 0 && impact.damage > 0;
	}

	static isTargetWillKilledAfterImpact(target, impact) {
		return target.hp - impact.damage <= 0;
	}

	static isCurrentTargetBestThenLastBestTarget(target, bestTarget) {
		return target.hp < bestTarget.hp;
	}

	static isCurrentImpactLowerCostThenLastBestImpactForTheSameTarget(target, bestTarget, bestImpact, impact) {
		return bestTarget === target && bestImpact.lv > impact;
	}

	static isCurrentImpactWillDoMoreDamageThenLastBestImpact(impact, bestImpact) {
		return bestImpact.damage < impact.damage;
	}

	static isTargetAliveAndImpactHeal(target, impact) {
		return target.hp > 0 && impact.damage < 0;
	}

	static isPossibleToHealOverMaxHPOfTarget(target, impactHeal) {
		return target.hp + impactHeal > target.maxHP;
	}

}